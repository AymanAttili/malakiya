import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { approveReservation, deleteReservation } from "../../services/apiReservations";

export function useDispatchReservation() {
    const queryClient = useQueryClient();
    const { mutateAsync: reservationDispatch, isPending, isError, error } = useMutation({
        mutationFn: async ({ action, payload }) => {
            switch (action) {
                case 'approve': await approveReservation(payload.id); break;
                case 'delete': await deleteReservation(payload.id); break;
                default: throw new Error('عملية غير معروفة.')
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reservations'] });
            Swal.fire({
                title: 'تمت العملية بنجاح',
                icon: 'success',
                confirmButtonText: 'تم',
                confirmButtonColor: '#775236'
            })
        },
        onError: () => {
            Swal.fire({
                title: 'حدثت مشكلة',
                icon: 'error',
                confirmButtonText: 'رجوع',
                confirmButtonColor: '#775236'
            })
        }
    });

    return { reservationDispatch, isLoading: isPending, isError, error };
}
