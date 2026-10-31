import "server-only";

export type ErpAvailability = "Skladem" | "Na dotaz";

type Snapshot = {
  schemaVersion: number;
  source: string;
  generatedAt: string;
  products: Array<{
    erpCode: string;
    availability: ErpAvailability;
  }>;
};

const STORAGE_KEY = "jz:eshop:availability:v1";

export async function getErpAvailability(
  erpCodes: string[],
): Promise<Record<string, ErpAvailability>> {
  const codes = [...new Set(erpCodes.filter(Boolean))].slice(0, 100);

  const fallback: Record<string, ErpAvailability> =
    Object.fromEntries(codes.map((code) => [code, "Na dotaz"]));

  if (codes.length === 0) {
    return fallback;
  }

  const redisUrl = process.env.KV_REST_API_URL;
  const redisToken = process.env.KV_REST_API_TOKEN;

  if (!redisUrl || !redisToken) {
    return fallback;
  }

  try {
    const response = await fetch(redisUrl.replace(/\/+$/, ""), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", STORAGE_KEY]),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as {
      result?: unknown;
      error?: string;
    };

    if (data.error || typeof data.result !== "string") {
      return fallback;
    }

    const snapshot = JSON.parse(data.result) as Snapshot;

    if (
      snapshot.schemaVersion !== 1 ||
      snapshot.source !== "jz-erp" ||
      !Array.isArray(snapshot.products)
    ) {
      return fallback;
    }

    const generated = Date.parse(snapshot.generatedAt);
    const age = Date.now() - generated;

    if (
      !Number.isFinite(generated) ||
      age < -5 * 60_000 ||
      age > 24 * 60 * 60_000
    ) {
      return fallback;
    }

    const result = { ...fallback };

    for (const product of snapshot.products) {
      if (
        product &&
        typeof product.erpCode === "string" &&
        Object.prototype.hasOwnProperty.call(result, product.erpCode) &&
        (product.availability === "Skladem" ||
          product.availability === "Na dotaz")
      ) {
        result[product.erpCode] = product.availability;
      }
    }

    return result;
  } catch {
    return fallback;
  }
}
