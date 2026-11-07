import { useMutation } from '@apollo/client/react';

import { toast } from '@/components/ui/toast';
import { JOIN_WORKSPACE } from '@/graphqlApi/workspace/mutation';
import { FETCH_WORKSPACES } from '@/graphqlApi/workspace/query';

export const useJoinWorkspace=(workspaceId)=>{
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
