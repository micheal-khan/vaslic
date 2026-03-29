import { getProductsByCategory } from "@/lib/data";
import FunkyClientPage from "./client";

export default async function FunkyPage() {
    const { products, category } = await getProductsByCategory("funky");
    return <FunkyClientPage products={products} category={category} />;
}
