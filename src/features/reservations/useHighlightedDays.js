import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

export function useHighlightedDays({ month, year }) {
    const queryClient = useQueryClient();
    const { data: highlightedDays, error, isError } = useQuery({
        queryKey: ["highlightedDays", { month, year }],
        queryFn: async () => {
            const reservations = queryClient.getQueriesData({ queryKey: ["reservations", { action: "fetchMonth", payload: { 'month': month, 'year': year } }] })
            console.log(reservations, month, year);

            return reservations[0][1].reduce((arr, item) => {
                const num = dayjs(item.date).$D
                console.log(num);

                arr.push(num)
                return arr
            }, []) || []
        },
        refetchInterval: 10 * 1000,
        throwOnError: true
    });

    return { highlightedDays, error, isError };
}