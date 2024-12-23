import { useQuery } from "@tanstack/react-query";

export function useAdmin() {
    const { isFetching, data: admin, error, isError } = useQuery({
        queryKey: ["admin"],
        queryFn: getAdmin,
        throwOnError: true
    });

    return { isLoading: isFetching, admin, isAuthenticated: admin && true, error, isError };
}

const getAdmin = () => {
    return JSON.parse(localStorage.getItem('user'))
}
