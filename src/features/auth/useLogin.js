import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { login as loginAPI } from '../../services/apiAuth'

export function useLogin() {
    const queryClient = useQueryClient();

    const { mutateAsync: login, isPending } = useMutation({
        mutationFn: (payload) => loginAPI(payload),
        onSuccess: (data) => {
            queryClient.setQueryData(['admin'], data.user);
            localStorage.setItem('user', JSON.stringify(data.user))
        },
        onError: () => {
            Swal.fire({
                title: 'كلمة السر أو الإيميل خاطئ',
                icon: 'error',
                confirmButtonText: 'رجوع',
                confirmButtonColor: '#775236'
            })
        }
    });

    return { login, isLoading: isPending };
}
