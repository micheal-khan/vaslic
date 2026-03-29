"use server";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: "Unauthorized" };
    }

    const updates = {
        id: user.id,
        full_name: formData.get("full_name") as string,
        // include other valid profile fields
    };

    const { error } = await supabase
        .from("profiles")
        .upsert(updates);

    if (error) {
        return { success: false, error: error.message };
    }
    return { success: true, error: null };
}
