import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AvantGardeProductClient from "./AvantGardeProductClient";

export default async function AvantGardeProductPage({ params }: { params: Promise<{ slug: string }> }) {
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
    if (product.category?.slug !== "avant-garde") {
        return notFound();
    }

    return <AvantGardeProductClient product={product} />;
}
