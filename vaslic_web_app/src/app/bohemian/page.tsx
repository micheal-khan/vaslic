import { getProductsByCategory } from "@/lib/data";
import BohemianClientPage from "./client";

export default async function BohemianPage() {
    const { products, category } = await getProductsByCategory("bohemian");
    return <BohemianClientPage products={products} category={category} />;
}
