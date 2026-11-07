import { useMutation } from '@apollo/client/react';

import { toast } from '@/components/ui/toast';
import { RESET_JOIN_CODE } from '@/graphqlApi/workspace/mutation';
import { FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';

export const useResetJoinCode=(workspaceId)=>{
    const [mutate,{data,error,loading}]=useMutation(RESET_JOIN_CODE,{
        refetchQueries:[
            {
                query:FETCH_WORKSPACE_BY_ID,
                variables:{workspaceId:Number(workspaceId)}
            }
        ],
        awaitRefetchQueries:true,
        onCompleted:()=>{
        toast.add({
          title: 'Join code reset',
          description: 'Old invite links will no longer work',
          type: 'success',
        });
        },
        onError:(error)=>{
            toast.add({
          title: 'Failed to reset join code',
          description: error.message,
          type: 'error',
        });
        }
    });
    return {
        resetJoinCodeMutation:()=>mutate({variables:{workspaceId:Number(workspaceId)}}),
        isPending:loading,
        isSuccess:!!data,
        error
    };

};
