import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
    const queryClient = useQueryClient();

    const { mutateAsync: logout, isPending } = useMutation({
        mutationFn: () => {
            localStorage.removeItem('user');
            queryClient.invalidateQueries({ queryKey: ['admin'] });
        }
    });

    return { logout, isLoading: isPending };
}
