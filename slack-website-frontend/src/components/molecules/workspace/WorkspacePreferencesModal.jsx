import { TrashIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useState,useEffect } from 'react';
import { useDeleteWorkspace } from '@/hooks/workspace/useDeleteWorkspace';
import { toast } from '@/components/ui/toast';
import { FETCH_WORKSPACES } from '@/graphqlApi/workspace/query';
import { useNavigate } from 'react-router-dom';



export const WorkspacePreferencesModal = () => {
    const { initialValue, openPreferences, setOpenPreferences,workspace } = useWorkspacePreferencesModal()
    const [workspaceId,setWorkspaceId]=useState(null)
    const {deleteWorkspaceMutation}=useDeleteWorkspace()
    const navigate=useNavigate()

    function handleClose() {
        setOpenPreferences(false);
    }
      useEffect(() => {
        setWorkspaceId(workspace?.id);
    }, [workspace]);

    async function handleDelete() {
        try {
            await deleteWorkspaceMutation({
                variables:{
                    workspaceId
                },
                refetchQueries:[
                    {query:FETCH_WORKSPACES}
                ]
            });
            toast.add({
                title: 'Workspace deleted successfully',
                type: 'success'
            });
            setOpenPreferences(false)
            navigate('/home')
            
        } catch(error) {
            console.log('Error in deleting workspace', error);
            toast.add({
                title: 'Error in deleting workspace',
                type: 'error'
            });
        }
    }


    return (
        <Dialog open={openPreferences} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {initialValue}
                    </DialogTitle>
                </DialogHeader>

                <div className='px-4 pb-4 flex flex-col gap-y-2'>
                    <div
                        className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'
                    >   
                        <div className='flex items-center justify-between'>
                            <p
                                className='font-semibold text-sm'
                            >
                                Workspace Name
                            </p>
                            <p
                                className='text-sm font-semibold hover:underline'
                            >
                                Edit
                            </p>
                        </div>
                        <p>
                            {initialValue}
                        </p>

                    </div>

                    <button
                        className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'
                          onClick={handleDelete}
                    >
                        <TrashIcon className='size-5' />
                        <p className='text-sm font-semibold'>
                            Delete Workspace
                        </p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};