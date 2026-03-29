import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProductClientPage from "./ProductClientPage";

export default async function ProductPage({ params }: { params: Promise<{ vaultId: string }> }) {
    const { vaultId } = await params;
    const supabase = await createClient();

    // Fetch the product by vault_id
    const { data: product, error } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(name, slug),
            sizes:product_sizes(id, size, units_remaining)
        `)
        .eq("vault_id", vaultId)
        .single();

    if (error || !product) {
        console.error("Error fetching product:", error);
        return notFound();
    }


    return <ProductClientPage product={product} />;
}
