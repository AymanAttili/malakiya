import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../../services/apiReservations";
import { format } from "date-fns";

export function useReservationsAdmin(notApproved = false) {
    const { isFetching, data: reservations, error, isError } = useQuery({
        queryKey: ["reservations", notApproved],
        queryFn: async () => {
            return await getReservations(notApproved, format(new Date(), 'yyyy/MM/dd'));
        },
        throwOnError: true
    });

    return { isLoading: isFetching, reservations, error, isError };
}