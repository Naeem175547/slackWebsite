import { GET_PAGINATED_MESSAGES } from "@/graphqlApi/message/query";
import { useQuery } from "@apollo/client/react";

// The token is attached by the Apollo authLink, so it isn't passed here.
export function useGetPaginatedMessages({ channelId, page = 1, limit = 20 }) {
    const { data, loading, error, refetch } = useQuery(GET_PAGINATED_MESSAGES, {
        variables: {
            messageParams: { channelId: Number(channelId) },
            page,
            limit,
        },
        fetchPolicy: "network-only",
        skip: !channelId,
    });

    return {
        // Backend returns newest first
        messages: data?.getPaginatedMessage?.data ?? [],    
        isFetching: loading,
        error,
        isError: !!error,
        refetch,
    };
}
