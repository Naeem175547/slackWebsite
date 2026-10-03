import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import useCreateWorkspaceModal from '@/hooks/context/useCreateWorkspaceModel';
import useCreateWorkspace from '@/hooks/workspace/useCreateWorkspace';

export const CreateWorkspaceModal = () => {
  const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } =
    useCreateWorkspaceModal();

  const { loading, createWorkspaceMutate } = useCreateWorkspace();

  const [workspaceName, setWorkspaceName] = useState('');

  const navigate = useNavigate();

  const isPending = loading;

  const handleClose = () => {
    setOpenCreateWorkspaceModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createWorkspaceMutate({
        variables: {
          createWorkspaceInput: {
            name: workspaceName,
          },
        },
      });

      console.log('Created the workspace', response);

      const workspaceId = response?.data?.createWorkspace?.data?.id;

      if (workspaceId) {
        setWorkspaceName('');
        setOpenCreateWorkspaceModal(false);
        navigate(`/workspaces/${workspaceId}`);
      }
    } catch (error) {
      console.log('Not able to create a new workspace', error);
    }
  };

  return (
    <Dialog open={openCreateWorkspaceModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <Input
            required
            minLength={3}
            disabled={isPending}
            placeholder="Put the workspace name, e.g. MyWorkspace, Dev Workspace..."
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create workspace'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
