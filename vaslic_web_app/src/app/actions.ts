"use server"

import { createClient } from "@/lib/supabase/server"

// For product-specific waitlist
export async function joinWaitlist(email: string, vault_id: string, category_slug: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('waitlist_entries').insert({
        email,
        vault_id,
        category: category_slug,
    })

    if (error) {
        return { success: false, error: error.message }
    }
    return { success: true, error: null }
}

// For general waitlist
export async function joinGeneralWaitlist(email: string, preferences: string[]) {
    const supabase = await createClient()

    const { error } = await supabase.from('waitlist_entries').insert({
        email,
        category: preferences.join(", "),
    })

    if (error) {
        return { success: false, error: error.message }
    }
    return { success: true, error: null }
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: error.message }
    }
    return { success: true }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return { error: error.message }
    }
    return { success: true }
}

export async function logout() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    return { success: !error }
}
