import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OrderHistoryClient from "./OrderHistoryClient";

export default async function OrderHistoryPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch orders for the user with order items and product details
    const { data: orders, error } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                *,
                product:products (
                    *,
                    category:categories (*)
                )
            )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching orders:", error);
    }

    return <OrderHistoryClient initialOrders={orders || []} user={user} />;
}
