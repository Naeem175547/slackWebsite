import ChatInput from "@/components/molecules/ChatInput/ChatInput";
import { useGetChannelById } from "@/hooks/channels/useGetChannelById";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { ChannelHeader } from "@/components/molecules/channel/channelHeader";

export default function Channel() {
    const { channelId } = useParams();

    const {
        isFetching,
        data: channelsDetails,
        error,
        isError,
    } = useGetChannelById(channelId);

    if (isFetching) {
        return <div className="h-full flex-1 flex items-center justify-center bg-red-500 ">
          <Loader2Icon className="animate-spin" size={24} text-muted-foreground />;
        </div>
    }

    if (isError) {
      return (
        <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
          <TriangleAlertIcon  className="size-6 text-muted-foreground"/>
          <span className="text-sm text-muted-foreground">Channel Not found</span>
        </div>
      )

        
    }

    return(
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <ChannelHeader name={channelsDetails?.name} />
          <ChatInput/>

        </div>

        

      </div>
    )
}