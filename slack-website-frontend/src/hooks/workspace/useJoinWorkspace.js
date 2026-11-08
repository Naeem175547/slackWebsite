import { useMutation } from '@apollo/client/react';

import { toast } from '@/components/ui/toast';
import { JOIN_WORKSPACE } from '@/graphqlApi/workspace/mutation';
import { FETCH_WORKSPACES } from '@/graphqlApi/workspace/query';

// True when the backend says the user is already in this workspace
const isAlreadyMemberError = (error) => {
    const errors = error?.errors ?? error?.graphQLErrors ?? [];
    return errors.some((e) => e?.extensions?.code === 'ALREADY_WORKSPACE_MEMBER');
};

export const useJoinWorkspace=(workspaceId, { onAlreadyMember } = {})=>{
    const [mutate,{data,error,loading}]=useMutation(JOIN_WORKSPACE,{
        refetchQueries:[{query:FETCH_WORKSPACES}],
        onCompleted:(data)=>{
        toast.add({
          title: 'Joined workspace',
          description: data.joinWorkspace.message,
          type: 'success',
        });
        },
        onError:(error)=>{
            if (isAlreadyMemberError(error)) {
                toast.add({
                    title: 'Already a member',
                    description: 'Taking you to the workspace',
                    type: 'info',
                });
                onAlreadyMember?.();
                return;
            }
            toast.add({
          title: 'Failed to join workspace',
          description: error.message,
          type: 'error',
        });
        }
    });
    return {
        joinWorkspaceMutation:(joinCode)=>mutate({variables:{workspaceId:Number(workspaceId),joinCode}}),
        isPending:loading,
        isSuccess:!!data,
        error
    };

};
