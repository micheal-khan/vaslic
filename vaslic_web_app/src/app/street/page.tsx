import { getProductsByCategory } from "@/lib/data";
import StreetClientPage from "./client";

export default async function StreetPage() {
    const { products, category } = await getProductsByCategory("street");
    return <StreetClientPage products={products} category={category} />;
}
