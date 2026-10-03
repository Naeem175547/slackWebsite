import { useMutation } from '@apollo/client/react';
import { CREATE_WORKSPACE } from '@/graphqlApi/workspace/mutation';
import { toast } from '@/components/ui/toast';
function useCreateWorkspace() {
  const [mutate, { data, loading, error }] = useMutation(CREATE_WORKSPACE, {
    onCompleted: (data) => {
      if (data.createWorkspace.success) {
        toast.add({
          title: 'Workspace Created',
          description: data.createWorkspace.message,
          type: 'success',
        });
      } else {
        toast.add({
          title: 'Error',
          description: data.createWorkspace.message,
          type: 'error',
        });
      }
    },

    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    },
  });

  return {
    createWorkspaceMutate: mutate,
    data,
    loading,
    error,
  };
}

export default useCreateWorkspace;
