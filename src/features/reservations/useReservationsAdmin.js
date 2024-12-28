import { useQuery } from "@tanstack/react-query";
import { getDayReservations, getMonthReservations, getReservations } from "../../services/apiReservations";
import { format } from "date-fns";

export function useReservationsAdmin({ action, payload }) {
    const { isFetching, data: reservations, error, isError } = useQuery({
        queryKey: ["reservations", { action, payload }],
        queryFn: async () => {
            switch (action) {
                case 'fetchNotApprovedOnly': return await getReservations(true, format(new Date(), 'yyyy/MM/dd'));
                case 'fetchAllUpcoming': return await getReservations(false, format(new Date(), 'yyyy/MM/dd'));
                case 'fetchMonth': return await getMonthReservations(payload.month, payload.year);
                case 'fetchDay': return await getDayReservations(payload.date);
                default: throw new Error('عملية غير معروفة.')
            }
        },
        refetchInterval: 60 * 1000,
        throwOnError: true
    });

    return { isLoading: isFetching, reservations, error, isError };
}