"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addWishlistItem(product_id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const { error } = await supabase
        .from("wishlist_items")
        .insert({ user_id: user.id, product_id });

    if (error) {
        return { success: false, error: error.message };
    }
    revalidatePath("/wishlist");
    return { success: true, error: null };
}

export async function removeWishlistItem(product_id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const { error } = await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product_id);

    if (error) {
        return { success: false, error: error.message };
    }
    revalidatePath("/wishlist");
    return { success: true, error: null };
}
