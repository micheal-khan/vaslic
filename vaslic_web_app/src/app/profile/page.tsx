import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileClientPage from "./client";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/login");
    }

    // Fetch user details from `profiles`
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    // Fetch orders
    const { data: orders } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                *,
                products ( name, images )
            )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <ProfileClientPage
            user={user}
            profile={profile}
            orders={orders || []}
        />
    );
}
