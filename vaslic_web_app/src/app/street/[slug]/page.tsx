import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import StreetProductClient from "./StreetProductClient";

export default async function StreetProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    // Fetch product by vault_id (case-insensitive)
    const { data: product, error } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(name, slug)
        `)
        .ilike("vault_id", slug)
        .single();

    if (error || !product) {
        return notFound();
    }

    // Ensure it belongs to the correct category slug
    if (product.category?.slug !== "street") {
        return notFound();
    }

    return <StreetProductClient product={product} />;
}
