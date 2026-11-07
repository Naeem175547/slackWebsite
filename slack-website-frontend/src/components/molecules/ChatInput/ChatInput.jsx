import { getPresignedUrl, uploadImageToAWSpresignedUrl } from '@/apis/s3';
import { Editor } from '@/components/atoms/Editor/Editor';
import { toast } from '@/components/ui/toast';
import { useSocket } from '@/hooks/context/useSocket';

export default function ChatInput() {
    const { socket, currentChannel } = useSocket();

    async function handleSubmit({ body, image }) {
        if (!socket || !currentChannel) {
            console.log('Socket not connected or channel not joined yet');
            return;
        }

        let fileUrl = null;
        if (image) {
            try {
                const presignedUrl = await getPresignedUrl();
                fileUrl = await uploadImageToAWSpresignedUrl({
                    url: presignedUrl,
                    file: image,
                });
            } catch (error) {
                console.log('Error in uploading image to s3', error);
                toast.add({
                    title: 'Error',
                    description: 'Image upload failed',
                });
                return;
            }
        }

        // Sender and workspace come from the JWT and channel on the backend
        socket.emit('NewMessage', { channelId: currentChannel, body, image: fileUrl }, (data) => {
            console.log('Message sent', data);
        });
    }

    return (
        <Editor variant='default'
            onSubmit={handleSubmit}
            onCancel={() => {}}
            placeholder="Type a message..."
            disabled={false} defaultValue="" />
    );
}
