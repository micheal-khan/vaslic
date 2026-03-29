import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import WishlistClientPage from "./client";

export default async function WishlistPage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    // Fetch wishlist
    const { data: wishlist } = await supabase
        .from("wishlist_items")
        .select(`
            id,
            product_id,
            products ( 
                id, 
                name, 
                price, 
                images, 
                vault_id, 
                categories ( slug, name )
            )
        `)
        .eq("user_id", user.id);

    return (
        <WishlistClientPage
            user={user}
            wishlist={wishlist || []}
        />
    );
}
