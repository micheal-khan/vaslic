import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AlertsClient from "./AlertsClient";

export default async function ScarcityAlertsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch products
    const { data: products } = await supabase
        .from("products")
        .select("*, categories(name, slug)");

    // Fetch wishlist if user exists
    let wishlist: any[] = [];
    if (user) {
        const { data: wishlistData } = await supabase
            .from("wishlist_items")
            .select("*, products(*, categories(name, slug))")
            .eq("user_id", user.id);
        wishlist = wishlistData || [];
    }

    return (
        <AlertsClient
            products={products || []}
            wishlist={wishlist}
        />
    );
}
