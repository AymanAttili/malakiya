import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reserveAPI } from "../../services/apiReservations";
import Swal from "sweetalert2";

export function useReserve() {
    const queryClient = useQueryClient();
    const { mutateAsync: reserve, isPending, isError, error } = useMutation({
        mutationFn: async (payload) => {
            return await reserveAPI(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pawnedReservations'] });
            Swal.fire({
                title: 'تم الحجز بنجاح',
                icon: 'success',
                confirmButtonText: 'تم',
                confirmButtonColor: '#775236'
            })
        },
        onError: () => {
            Swal.fire({
                title: 'حدثت مشكلة أثناء الحجز',
                icon: 'error',
                confirmButtonText: 'رجوع',
                confirmButtonColor: '#775236'
            })
        }
    });

    return { reserve, isLoading: isPending, isError, error };
}
