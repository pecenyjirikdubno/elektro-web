import "server-only";

export type ErpAvailability = "Skladem" | "Na dotaz";

type ErpAvailabilityResponse = {
  products: Array<{
    erpCode: string;
    availability: ErpAvailability;
  }>;
};

export async function getErpAvailability(
  erpCodes: string[],
): Promise<Record<string, ErpAvailability>> {
  const codes = [...new Set(erpCodes.filter(Boolean))].slice(0, 100);

  const fallback: Record<string, ErpAvailability> =
    Object.fromEntries(codes.map((code) => [code, "Na dotaz"]));

  if (codes.length === 0) {
    return fallback;
  }

  const apiUrl = process.env.JZ_ERP_API_URL;
  const apiKey = process.env.JZ_ERP_ESHOP_API_KEY;

  if (!apiUrl || !apiKey) {
    return fallback;
  }

  try {
    const url = new URL(
      `${apiUrl.replace(/\/+$/, "")}/api/v1/eshop/availability`,
    );

    for (const code of codes) {
      url.searchParams.append("erpCode", code);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-ESHOP-API-KEY": apiKey,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return fallback;
    }

    const data = (await response.json()) as ErpAvailabilityResponse;
    const result = { ...fallback };

    if (!Array.isArray(data.products)) {
      return fallback;
    }

    for (const product of data.products) {
      if (
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