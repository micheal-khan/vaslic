import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BohemianProductClient from "./BohemianProductClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const supabase = await createClient();
    const { data: product } = await supabase
        .from("products")
        .select("name, description")
        .ilike("vault_id", slug)
        .single();

    if (!product) return { title: "Product Not Found | VASLIC" };

    return {
        title: `${product.name} | VASLIC Archive`,
        description: product.description || `Examine the details of ${product.name} in the VASLIC Archive.`,
        openGraph: {
            title: `${product.name} | VASLIC Archive`,
            description: product.description || `Examine the details of ${product.name} in the VASLIC Archive.`,
        }
    };
}

export default async function BohemianProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const supabase = await createClient();

    // Fetch the product from database by vault_id (case insensitive)
    const { data: product, error } = await supabase
        .from("products")
        .select(`
            *,
            category:categories(name, slug)
        `)
        .ilike("vault_id", slug)
        .single();

    if (error || !product) {
        console.error("Error fetching bohemian product:", error);
        return notFound();
    }

    // Ensure it belongs to the bohemian category
    if (product.category?.slug !== "bohemian") {
        return notFound();
    }

    return <BohemianProductClient product={product} />;
}
