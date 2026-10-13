import { TrashIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogClose,DialogTrigger,DialogFooter } from '@/components/ui/dialog';
import { useWorkspacePreferencesModal } from '@/hooks/context/useWorkspacePreferencesModal';
import { useState,useEffect } from 'react';
import { useDeleteWorkspace } from '@/hooks/workspace/useDeleteWorkspace';
import { toast } from '@/components/ui/toast';
import { FETCH_WORKSPACES, FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';
import { useNavigate } from 'react-router-dom';
import { useUpdateWorkspace } from '@/hooks/workspace/useUpdateWorkspace';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/useConfirm';



export const WorkspacePreferencesModal = () => {
    const { initialValue, openPreferences, setOpenPreferences,workspace } = useWorkspacePreferencesModal()
    const [workspaceId,setWorkspaceId]=useState(null)
    const {deleteWorkspaceMutation}=useDeleteWorkspace()
    const navigate=useNavigate()
    const [editOpen,setEditOpen]=useState(false)
    const [renameValue,setRenameValue]=useState(workspace?.name)
    const {isPending,updateWorkspaceMutation}=useUpdateWorkspace()
    const {confirmation,ConfirmDialog}=useConfirm({title:"do you want to delete the workspace?",message:"this action cannnot be undone."})
    const {confirmation:updateConfirmation,ConfirmDialog:UpdateConfirmDialog}=useConfirm({title:"do you want to update the workspace?",message:"this action cannnot be undone."})


    function handleClose() {
        setOpenPreferences(false);
    }
      useEffect(() => {
        setWorkspaceId(workspace?.id);
        setRenameValue(workspace?.name)
    }, [workspace]);



    async function handleDelete() {
        try {
            const ok=await confirmation()
            console.log('Confirmation received')
            if(!ok){
                return;
            }
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

    async function handleFormSubmit(e) {
    e.preventDefault();
    const ok=await updateConfirmation()
            console.log('Confirmation received')
            if(!ok){
                return;
            }

    await updateWorkspaceMutation({
        variables: {
            workspaceId,
            updateWorkspaceInput: {
                name: renameValue,
            },
        },
        refetchQueries: [
            { query: FETCH_WORKSPACES },
            { query: FETCH_WORKSPACE_BY_ID, variables: { workspaceId } },
        ],
    });

    setEditOpen(false);
}
    return (
        <>
        <ConfirmDialog/>
        <UpdateConfirmDialog/>
        <Dialog
        open={openPreferences}
        onOpenChange={handleClose}
        >
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                {initialValue}
            </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 flex flex-col gap-y-2">
            <button
                onClick={() => {
                    setOpenPreferences(false)
                    setEditOpen(true)
                }}
                className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
            >
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">
                        Workspace Name
                    </p>

                    <p className="text-sm font-semibold hover:underline">
                        Edit
                    </p>
                </div>

                <p className="text-sm">
                    {initialValue}
                </p>
            </button>

            <button
                className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
                onClick={handleDelete}
            >
                <TrashIcon className="size-5" />
                <p className="text-sm font-semibold">
                    Delete Workspace
                </p>
            </button>
        </div>
    </DialogContent>
</Dialog>



<Dialog
    open={editOpen}
    onOpenChange={setEditOpen}
>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Rename Workspace
            </DialogTitle>
        </DialogHeader>

        <form
            className="space-y-4"
            onSubmit={handleFormSubmit}
        >
            <Input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                required
                autoFocus
                minLength={3}
                maxLength={50}
                disabled={isPending}
                placeholder="Workspace Name e.g. Design Team"
            />

            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </DialogClose>

                <Button
                    type="submit"
                    disabled={isPending}
                >
                    Save
                </Button>
            </DialogFooter>
        </form>
    </DialogContent>
</Dialog>
</>
    )
    
};
