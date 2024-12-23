import { useQuery } from "@tanstack/react-query";
import { getPawnedReservations } from "../../services/apiReservations";

export function usePawnedReservations(date) {
    const { isFetching, data: pawnedReservations, error, isError } = useQuery({
        queryKey: ["pawnedReservations", date],
        queryFn: async () => {
            return await getPawnedReservations(date)
        },

        throwOnError: true
    });

    return { isLoading: isFetching, pawnedReservations, error, isError };
}