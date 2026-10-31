import products from "../../data/products.json";
import Catalog from "./Catalog";
import { getErpAvailability } from "../../lib/erpAvailability";
import "./eshop.css";

export const dynamic = "force-dynamic";

export default async function Shop() {
  const erpCodes = products
    .map((product) => "erpCode" in product ? product.erpCode : undefined)
    .filter((code): code is string => typeof code === "string" && code.length > 0);

  const availability = await getErpAvailability(erpCodes);

  const catalogProducts = products.map((product) => {
    const erpCode = "erpCode" in product ? product.erpCode : undefined;

    if (!erpCode) {
      return product;
    }

    return {
      ...product,
      availability: availability[erpCode] ?? "Na dotaz",
    };
  });

  return (
    <div className="jz-shop">
      <Catalog products={catalogProducts} />
    </div>
  );
}