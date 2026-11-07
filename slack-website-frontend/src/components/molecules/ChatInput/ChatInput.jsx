import { Editor } from '@/components/atoms/Editor/Editor'
import { useSocket } from '@/hooks/context/useSocket';

export default function ChatInput() {
  const {socket,currentChannel}=useSocket();

    async function handleSubmit({ body }) {
        console.log(body);
        if (!socket || !currentChannel) {
          console.log('Socket not connected or channel not joined yet');
          return;
        }
        socket.emit('NewMessage', { channelId: currentChannel, body }, (data) => {
          console.log('Message sent', data);
        });
    }
  return (
   <Editor variant='default'
    onSubmit={handleSubmit}
    onCancel={() => {}}
    placeholder="Type a message..."
    disabled={false} defaultValue="" />
  )
}
