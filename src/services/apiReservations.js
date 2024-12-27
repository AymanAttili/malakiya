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


export async function getReservations(notApproved = false, date) {
    if (notApproved)
        return await getNotApprovedReservations(date);

    let { data: reservations, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true })
        .gte('date', date)


    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;

}

export async function getNotApprovedReservations(date) {
    let { data: reservations, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: true })
        .order('time', { ascending: true })
        .gte('date', date)
        .eq('approved', 0)

    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;
}

export async function approveReservation(id) {
    const { error } = await supabase
        .from('reservations')
        .update({ approved: 1 })
        .eq('id', id)


    if (error) {
        throw new Error("Reservations could not be updated");
    }
}

export async function deleteReservation(id) {
    const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id)

    if (error) {
        throw new Error("Reservations could not be deleted");
    }
}