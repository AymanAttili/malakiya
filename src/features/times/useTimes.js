export const useTimes = (pawnedReservations = []) => {
    const isAvailable = (time) => {
        return pawnedReservations.filter((t) => t.time === time).length === 0
    }
    const times = [
        { id: 1, time: '12:00 PM', val: '12:00:00', isAvailable: isAvailable('12:00:00') },
        { id: 2, time: '2:00 PM', val: '14:00:00', isAvailable: isAvailable('14:00:00') },
        { id: 3, time: '4:00 PM', val: '16:00:00', isAvailable: isAvailable('16:00:00') },
        { id: 4, time: '6:00 PM', val: '18:00:00', isAvailable: isAvailable('18:00:00') },
        { id: 5, time: '8:00 PM', val: '20:00:00', isAvailable: isAvailable('20:00:00') },
        { id: 6, time: '10:00 PM', val: '22:00:00', isAvailable: isAvailable('22:00:00') },
    ]

    return { times }
}

