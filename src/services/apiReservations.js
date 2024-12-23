import supabase from "./supabase";

export async function getPawnedReservations(date) {
    let { data: reservations, error } = await supabase
        .from('reservations')
        .select('time')
        .eq('date', date)

    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;
}

export async function reserveAPI(payload) {
    const { data, error } = await supabase
        .from('reservations')
        .insert([
            payload
        ])
        .select()

    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return data;
}