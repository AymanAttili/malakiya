import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error) => {
            console.error(`Something went wrong: ${error.message}`);
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 60 * 1000,
        },
    },
});
export default queryClient;