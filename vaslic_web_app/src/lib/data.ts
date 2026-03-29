import { createClient } from "@/lib/supabase/server";

/**
 * Fetch all products for a given category slug.
 * Uses a direct join via PostgREST foreign table filtering.
 */
export async function getProductsByCategory(categorySlug: string) {
    const supabase = await createClient();

    // Get category id first
    const { data: cat } = await supabase
        .from("categories")
        .select("id, name, slug")
        .eq("slug", categorySlug)
        .single();

    if (!cat) return { products: [], category: null };

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            id,
            vault_id,
            name,
            description,
            price,
            compare_price,
            total_units,
            units_remaining,
            status,
            images,
            sizes,
            materials,
            care_instructions,
            retired_at,
            sold_out_in_days,
            created_at,
            product_sizes(id, size, units_remaining)
        `)
        .eq("category_id", cat.id)
        .order("status", { ascending: true });

    if (error) {
        console.error(`Error fetching ${categorySlug} products:`, error);
        return { products: [], category: cat };
    }

    return { products: products || [], category: cat };
}

/**
 * Fetch products grouped by category for the homepage.
 */
export async function getHomepageData() {
    const supabase = await createClient();

    const { data: categories } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });

    if (!categories) return { productsByCategory: {}, retiredProducts: [] };

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            *,
            categories(slug)
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching homepage products:", error);
        return { productsByCategory: {}, retiredProducts: [] };
    }

    const productsByCategory: Record<string, any[]> = {};
    const retiredProducts: any[] = [];

    // Initialize groups for each category
    categories.forEach(cat => {
        productsByCategory[cat.slug] = [];
    });

    products?.forEach(product => {
        if (product.status === 'retired') {
            retiredProducts.push(product);
        } else {
            // @ts-ignore - Supabase categories join type
            const catSlug = product.categories?.slug;
            if (catSlug && productsByCategory[catSlug] && productsByCategory[catSlug].length < 4) {
                productsByCategory[catSlug].push(product);
            }
        }
    });

    return {
        productsByCategory,
        retiredProducts: retiredProducts.slice(0, 4)
    };
}

