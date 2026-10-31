import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

type Availability = "Skladem" | "Na dotaz";

type Product = {
  erpCode: string;
  availability: Availability;
};

type Snapshot = {
  schemaVersion: 1;
  generatedAt: string;
  source: "jz-erp";
  products: Product[];
};

const STORAGE_KEY = "jz:eshop:availability:v1";

function authorized(request: NextRequest): boolean {
  const expected = process.env.JZ_ESHOP_SYNC_KEY;
  const supplied = request.headers.get("x-jz-eshop-sync-key");

  if (!expected || !supplied) return false;

  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);

  return a.length === b.length && timingSafeEqual(a, b);
}

function validateSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const data = value as Record<string, unknown>;

  if (data.schemaVersion !== 1 || data.source !== "jz-erp") {
    return false;
  }

  if (typeof data.generatedAt !== "string") {
    return false;
  }

  const generated = Date.parse(data.generatedAt);
  const now = Date.now();

  if (
    !Number.isFinite(generated) ||
    generated > now + 5 * 60_000 ||
    generated < now - 24 * 60 * 60_000
  ) {
    return false;
  }

  if (
    !Array.isArray(data.products) ||
    data.products.length === 0 ||
    data.products.length > 100
  ) {
    return false;
  }

  const seen = new Set<string>();

  for (const item of data.products) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      return false;
    }

    const product = item as Record<string, unknown>;

    if (
      typeof product.erpCode !== "string" ||
      product.erpCode.length === 0 ||
      product.erpCode.length > 100 ||
      (product.availability !== "Skladem" &&
        product.availability !== "Na dotaz")
    ) {
      return false;
    }

    if (seen.has(product.erpCode)) {
      return false;
    }

    seen.add(product.erpCode);
  }

  return true;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    return NextResponse.json(
      { error: "Storage not configured" },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    const limit = 64 * 1024;
    const reader = request.body?.getReader();

    if (!reader) {
      return NextResponse.json(
        { error: "Invalid JSON" },
        { status: 400 },
      );
    }

    const chunks: Uint8Array[] = [];
    let size = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        size += value.byteLength;

        if (size > limit) {
          await reader.cancel();
          return NextResponse.json(
            { error: "Payload too large" },
            { status: 413 },
          );
        }

        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 },
    );
  }

  if (!validateSnapshot(body)) {
    return NextResponse.json(
      { error: "Invalid snapshot" },
      { status: 400 },
    );
  }

  const snapshot = body as Snapshot;

  try {
    const lua = `
      local current = redis.call("GET", KEYS[1])
      if current then
        local ok, decoded = pcall(cjson.decode, current)
        if not ok or type(decoded) ~= "table" or
           type(decoded.generatedAt) ~= "string" then
          return redis.error_reply("Invalid stored snapshot")
        end

        local previousTime = tonumber(decoded.generatedAtMs)
        if not previousTime then
          return redis.error_reply("Invalid stored timestamp")
        end

        if previousTime >= tonumber(ARGV[1]) then
          return 0
        end
      end

      redis.call("SET", KEYS[1], ARGV[2])
      return 1
    `;

    const command = [
      "EVAL",
      lua,
      "1",
      STORAGE_KEY,
      String(Date.parse(snapshot.generatedAt)),
      JSON.stringify({
        ...snapshot,
        generatedAtMs: Date.parse(snapshot.generatedAt),
      }),
    ];

    const response = await fetch(
      redisUrl.replace(/\/+$/, ""),
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(command),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!response.ok) {
      throw new Error("Redis command failed");
    }

    const result = (await response.json()) as {
      result?: number;
      error?: string;
    };

    if (result.error || (result.result !== 0 && result.result !== 1)) {
      throw new Error("Redis rejected command");
    }

    if (result.result === 0) {
      return NextResponse.json(
        { error: "Snapshot is not newer" },
        { status: 409 },
      );
    }

    return NextResponse.json({
      ok: true,
      products: snapshot.products.length,
      generatedAt: snapshot.generatedAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Storage unavailable" },
      { status: 503 },
    );
  }
}
