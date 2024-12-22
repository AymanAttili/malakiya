import { useQuery } from "@tanstack/react-query";
import { getAvailableReservations } from "../../services/apiReservations";

export function useAvailableReservations(date) {
    const { isFetching, data: availableReservations, error, isError } = useQuery({
        queryKey: ["availableReservations", date],
        queryFn: async () => {
            return await getAvailableReservations(date)
        },

        throwOnError: true
    });

    return { isLoading: isFetching, availableReservations, error, isError };
}