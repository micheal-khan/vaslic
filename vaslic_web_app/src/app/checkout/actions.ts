"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOrder(orderData: {
    subtotal: number,
    shipping_cost: number,
    total: number,
    items: any[]
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Not authenticated" };
    }

    // Generate a unique order number
    const orderNumber = `VAS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Get a default address (in real app, user selects this)
    const { data: address } = await supabase
        .from("addresses")
        .select("id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

    // Insert order
    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
            order_number: orderNumber,
            user_id: user.id,
            shipping_address_id: address?.id || null,
            subtotal: orderData.subtotal,
            shipping_cost: orderData.shipping_cost,
            total: orderData.total,
            status: 'processing',
            payment_status: 'paid' // Simulate paid for now
        })
        .select()
        .single();

    if (orderError) {
        console.error("Order insertion error:", orderError);
        return { error: orderError.message };
    }

    // Insert order items
    const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        vault_id: item.vault_id || 'UNKNOWN', // Fallback if missing
        product_name: item.name,
        size: item.size || 'OS',
        quantity: item.quantity,
        price_at_purchase: parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

    if (itemsError) {
        console.error("Order items insertion error:", itemsError);
        return { error: itemsError.message };
    }

    revalidatePath("/orders");
    revalidatePath("/profile");

    return { success: true, orderNumber };
}
