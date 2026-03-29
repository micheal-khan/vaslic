import { getProductsByCategory } from "@/lib/data";
import AvantGardeClientPage from "./client";

export default async function AvantGardePage() {
    const { products, category } = await getProductsByCategory("avant-garde");
    return <AvantGardeClientPage products={products} category={category} />;
}
