import supabase from "./supabase";

export async function login(payload) {
    let { data, error } = await supabase.auth.signInWithPassword(payload)
    console.log(supabase.auth);

    if (error)
        throw new Error('invalid credentials')

    return data;
}