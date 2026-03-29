import { getProductsByCategory } from "@/lib/data";
import GothicClientPage from "./client";

export default async function GothicPage() {
    const { products, category } = await getProductsByCategory("gothic");
    return <GothicClientPage products={products} category={category} />;
}
