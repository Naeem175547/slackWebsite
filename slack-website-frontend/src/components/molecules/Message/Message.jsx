import { MessageImageThumbnail } from '@/components/atoms/MessageImageThumbnail/MessageImageThumbnail';
import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { Avatar, AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { formatMessageTime } from '@/utils/formatMessageTime';

// isOwn = sent by the logged-in user: shown on the right; received ones on the left
export const Message = ({
    authorImage,
    authorName,
    createdAt,
    body,
    image,
    isOwn = false
}) => {
    return (
        <div
            className={`flex items-end gap-2 p-1.5 px-5 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
        >
            {!isOwn && (
                <Avatar>
                    <AvatarImage className="rounded-md" src={authorImage} />
                    <AvatarFallback
                        className="rounded-md bg-sky-500 text-white text-sm"
                    >
                        {authorName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}

            <div
                className={`flex flex-col max-w-[70%] min-w-0 overflow-hidden rounded-lg px-3 py-2 ${
                    isOwn
                        ? 'bg-sky-100 rounded-br-none items-end'
                        : 'bg-gray-100 rounded-bl-none items-start'
                }`}
            >
                <div className='text-xs'>
                    {!isOwn && (
                        <>
                            <span className='font-bold text-primary'>{authorName}</span>
                            <span>&nbsp;&nbsp;</span>
                        </>
                    )}
                    <span
                        className='text-xs text-muted-foreground'
                        title={createdAt ? new Date(/^\d+$/.test(String(createdAt)) ? Number(createdAt) : createdAt).toLocaleString() : undefined}
                    >
                        {formatMessageTime(createdAt)}
                    </span>
                </div>

                <MessageRenderer value={body} />
                {/* Any images if there are */}
                {image && <MessageImageThumbnail url={image} />}
            </div>
        </div>
    );
};
