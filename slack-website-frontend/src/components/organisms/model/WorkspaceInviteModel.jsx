import { CopyIcon, RefreshCcwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useResetJoinCode } from '@/hooks/workspace/useResetJoinCode';

export const WorkspaceInviteModal = ({ openInviteModal, setOpenInviteModal, workspaceName, joinCode,workspaceId }) => {
    const { currentWorkspace } = useCurrentWorkspace();
    const { resetJoinCodeMutation, isPending } = useResetJoinCode(currentWorkspace?.id);

    // Full invite link; the code rides along as ?code= so the join page is pre-filled
    const inviteLink = `${window.location.origin}/workspaces/join/${workspaceId}?code=${encodeURIComponent(joinCode ?? '')}`;

    async function handleCopy() {
        const inviteText = `Join ${workspaceName}: ${inviteLink}\nJoin code: ${joinCode}`;
        try {
            await navigator.clipboard.writeText(inviteText);
            toast.add({
                title: 'Invite link copied to clipboard',
                type: 'success'
            });
        } catch {
            toast.add({
                title: 'Could not copy the invite link',
                description: inviteLink,
                type: 'error'
            });
        }
    }

    async function handleResetCode() {
        try {
            await resetJoinCodeMutation();
        } catch (error) {
            console.error('Error resetting join code:', error);
        }
    }

    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite people to {workspaceName}
                    </DialogTitle>
                    <DialogDescription>
                        Use the code shown below to invite people to your workspace.
                    </DialogDescription>
                </DialogHeader>

                <div
                    className='flex flex-col items-center justify-center py-10 gap-y-4'
                >
                    <p className='font-bold text-4xl uppercase'>
                        {joinCode}
                    </p>
                    <Button size="sm" variant="ghost" onClick={handleCopy}>
                        Copy Link
                        <CopyIcon className='size-4 ml-2' />
                    </Button>
                    <a
                     href={inviteLink}
                     target="_blank"
                     rel="noreferrer"
                      className="text-blue-500"
>
  Redirect to join page
</a>
                     </div>
                <div
                    className='flex items-center justify-center w-full'
                >
                    <Button variant="outline" onClick={handleResetCode} disabled={isPending}>
                        Reset Join Code
                        <RefreshCcwIcon className='size-4 ml-2' />
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};