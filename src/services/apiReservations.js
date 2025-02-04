import { format } from "date-fns";
import supabase from "./supabase";
import { serviceName } from "../Enums/services";
import { timeFormatter } from "../utils/formatters";
import confirmationEmail from "../features/emails/confirmationEmail";
import rejectionEmail from "../features/emails/rejectionEmail";

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

    const reservePayload = {
        date: payload.date,
        time: payload.time,
        notes: payload.notes
    }

    const { data: reservation, error: resError } = await supabase
        .from('reservations')
        .insert([
            reservePayload
        ])
        .select()

    if (resError) {
        throw new Error("Reservations could not be loaded");
    }

    const userPayload = {
        name: payload.name,
        email: payload.email,
        address: payload.address,
        number: payload.number,
        reservation_id: reservation[0].id
    }

    const { data } = await supabase
        .from('users')
        .insert([
            userPayload
        ])
        .select()

    const services = payload.services.map((ser) => {
        return {
            value: ser,
            reservation_id: reservation[0].id
        }
    })

    await supabase
        .from('services')
        .insert(services)

    return data;
}


export async function getReservations(notApproved = false, date) {
    if (notApproved)
        return await getNotApprovedReservations(date);

    let { data: reservations, error } = await supabase
        .from('reservations')
        .select(`
            id,
            date,
            time,
            approved,
            notes,
            users(*),
            services(*)
            `)
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
        .select(`
            id,
            date,
            time,
            approved,
            notes,
            users(*),
            services(*)
            `)
        .order('date', { ascending: true })
        .order('time', { ascending: true })
        .gte('date', date)
        .eq('approved', 0)

    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;
}

export async function getMonthReservations(month, year) {
    const lower = `${year}/${month}/01`
    let upper = `${year}/${month + 1}/01`

    if (month == 12)
        upper = `${year + 1}/1/01`
    let { data: reservations, error } = await supabase
        .from('reservations')
        .select(`
            id,
            date,
            time,
            approved,
            notes,
            users(*),
            services(*)
            `)
        .order('date', { ascending: true })
        .order('time', { ascending: true })
        .gte('date', lower)
        .lt('date', upper)

    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;
}

export async function getDayReservations(date) {
    date = format(date, 'yyyy/MM/dd');
    let { data: reservations, error } = await supabase
        .from('reservations')
        .select(`
            id,
            date,
            time,
            approved,
            notes,
            users(*),
            services(*)
            `)
        .order('time', { ascending: true })
        .eq('date', date)


    if (error) {
        throw new Error("Reservations could not be loaded");
    }
    return reservations;
}


export async function approveReservation(id) {
    const { data, error } = await supabase
        .from('reservations')
        .update({ approved: 1 })
        .eq('id', id)
        .select()



    if (error) {
        throw new Error("Reservations could not be updated");
    }

    let services = data[0].services.map((it) => serviceName[it])
    const formattedTime = timeFormatter(data[0].time)

    const formData = {
        name: data[0].name,
        to_email: data[0].email,
        date: data[0].date,
        time: formattedTime,
        services
    }


    confirmationEmail(formData)
}

export async function deleteReservation(id) {
    const { data, error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id)
        .select()

    const formData = {
        name: data[0].name,
        to_email: data[0].email,
    }

    rejectionEmail(formData)


    if (error) {
        throw new Error("Reservations could not be deleted");
    }
}