import { useMutation } from '@apollo/client/react';
import { ADD_CHANNEL_TO_WORKSPACE } from '@/graphqlApi/workspace/mutation';

export default function useAddChannelToWorkspace() {
  const [mutate, { data, error, loading }] = useMutation(
    ADD_CHANNEL_TO_WORKSPACE,
    {
      onCompleted: (response) => {
        console.log('Channel added:', response);
      },
      onError: (error) => {
        console.error('Error adding channel to workspace:', error);
      },
    }
  );

  return {
    addChannelToWorkspaceMutation: mutate,
    isPending: loading,
    isSuccess: !!data?.addChannelToWorkspace?.success,
    error,
  };
}