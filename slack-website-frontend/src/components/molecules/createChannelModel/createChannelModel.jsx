import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';
import useAddChannelToWorkspace from '@/hooks/workspace/useAddChannelToWorkspace';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { Await } from 'react-router-dom';
import { toast } from '@/components/ui/toast';
import { FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';

export const CreateChannelModal = () => {    
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();
    const [channelName, setChannelName] = useState('');
    const {addChannelToWorkspaceMutation}=useAddChannelToWorkspace()
    const {currentWorkspace}=useCurrentWorkspace()

    function handleClose() {
        setOpenCreateChannelModal(false);
    }

    async function handleFormSubmit(e) {
     e.preventDefault();

     try {
       await addChannelToWorkspaceMutation({
         variables: {
           workspaceId: Number(currentWorkspace.id),
           channelName: channelName,
         },
         refetchQueries: [
           {
             query: FETCH_WORKSPACE_BY_ID,
             variables: { workspaceId: Number(currentWorkspace.id) },
           },
         ],
         awaitRefetchQueries: true,
       });

       toast.add({
         title: 'Success',
         description: 'Channel created successfully',
       });
       setChannelName('');
       handleClose();
     } catch (error) {
       toast.add({
         title: 'Error',
         description: error.message || 'Failed to create channel',
       });
     }
}

    return (
        <Dialog
            open={openCreateChannelModal}
            onOpenChange={handleClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a channel</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input 
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        minLength={3}
                        placeholder="Channel Name e.g. team-announcements"
                        required
                    />

                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>
                            Create Channel
                        </Button>
                    </div>
                </form>
            </DialogContent>
            
        </Dialog>
    );
};