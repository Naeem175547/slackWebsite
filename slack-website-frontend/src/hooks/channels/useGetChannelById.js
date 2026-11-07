import { GET_CHANNEL_BY_ID } from "@/graphqlApi/channel/query";
import { useQuery } from "@apollo/client/react";

export function useGetChannelById(channelId) {
    const { data, loading, error } = useQuery(GET_CHANNEL_BY_ID, {
        variables: {
            channelId: Number(channelId),
        },
        fetchPolicy: "network-only",
        skip: !channelId,
    });

    return {
        data,
        isFetching: loading,
        error,
        isError: !!error,
    };
}