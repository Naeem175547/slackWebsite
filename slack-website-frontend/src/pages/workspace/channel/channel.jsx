import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { ChannelHeader } from '@/components/molecules/channel/channelHeader';
import ChatInput from '@/components/molecules/ChatInput/ChatInput';
import { Message } from '@/components/molecules/Message/Message';
import { useGetChannelById } from '@/hooks/channels/useGetChannelById';
import { useAuth } from '@/hooks/context/useAuth';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { useSocket } from '@/hooks/context/useSocket';
import { useGetPaginatedMessages } from '@/hooks/messages/useGetPaginatedMessages';

export default function Channel() {
    const { channelId } = useParams();

    const { isFetching, data, isError } = useGetChannelById(channelId);
    const channelDetails = data?.getChannelById?.data;

    const { joinChannel } = useSocket();
    const { auth } = useAuth();
    const currentUserId = auth?.user?.id;
    const { messageList, setMessageList } = useChannelMessages();
    const messageContainerRef = useRef(null);

    // fetchPolicy is network-only, so this refetches whenever channelId changes
    const {
        messages,
        isFetching: isFetchingMessages,
        isError: isMessagesError,
    } = useGetPaginatedMessages({ channelId });

    useEffect(() => {
        if (!isFetching && !isError) {
            joinChannel(channelId);
        }
    }, [isFetching, isError, joinChannel, channelId]);

    // Clear the previous channel's messages straight away when switching
    useEffect(() => {
        setMessageList([]);
    }, [channelId, setMessageList]);

    useEffect(() => {
        if (!isFetchingMessages && !isMessagesError) {
            // Backend returns newest first; show oldest at the top
            setMessageList([...messages].reverse());
        }
    }, [isFetchingMessages, isMessagesError, messages, setMessageList]);

    // Keep the newest message in view when history loads or a new one arrives
    useEffect(() => {
        const container = messageContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messageList, isFetching]);

    if (isFetching) {
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader2Icon className="animate-spin size-6 text-muted-foreground" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
                <TriangleAlertIcon className="size-6 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Channel Not found</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <ChannelHeader name={channelDetails?.name} />

            <div ref={messageContainerRef} className="flex-1 min-h-0 overflow-y-auto">
                {messageList?.map((message) => (
                    <Message
                        key={message.id}
                        body={message.body}
                        authorImage={message.user?.avatar}
                        authorName={message.user?.username || 'Unknown user'}
                        createdAt={message.createdAt}
                        image={message.image}
                        // ids can arrive as number or string, so compare as strings
                        isOwn={currentUserId != null && String(message.user?.id) === String(currentUserId)}
                    />
                ))}
            </div>

            <ChatInput />
        </div>
    );
}
