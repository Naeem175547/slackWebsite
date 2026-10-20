import { useMutation } from '@apollo/client/react';

import { toast } from '@/components/ui/toast';
import { ADD_MEMBER_TO_WORKSPACE } from '@/graphqlApi/workspace/mutation';
import { FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';

export const useAddMemberToWorkspace=(workspaceId)=>{
    const [mutate,{data,error,loading}]=useMutation(ADD_MEMBER_TO_WORKSPACE,{
        refetchQueries:[
            {
                query:FETCH_WORKSPACE_BY_ID,
                variables:{workspaceId:Number(workspaceId)}
            }
        ],
        onCompleted:(data)=>{
        toast.add({
          title: 'Member added',
          description: data.addMemberToWorkspace.message,
          type: 'success',
        });
        },
        onError:(error)=>{
            toast.add({
          title: 'Failed to add member',
          description: error.message,
          type: 'error',
        });
        }
    });
    return {
        addMemberToWorkspaceMutation:(memberId)=>mutate({variables:{workspaceId:Number(workspaceId),memberId:Number(memberId)}}),
        isPending:loading,
        isSuccess:!!data,
        error
    };

};
