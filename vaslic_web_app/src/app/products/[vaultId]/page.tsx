import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProductClientPage from "./client";

export default async function ProductPage({ params }: { params: { vaultId: string } }) {
    const supabase = await createClient();

    // Fetch the product by vault_id
    const { data: product, error } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(name, slug, theme_color),
            sizes:product_sizes(id, size, units_total, units_remaining)
        `)
        .eq("vault_id", params.vaultId)
        .single();

    if (error || !product) {
        return notFound();
    }

    return <ProductClientPage product={product} />;
}
