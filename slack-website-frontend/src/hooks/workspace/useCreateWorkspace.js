import { useMutation } from '@apollo/client';
import { CREATE_WORKSPACE } from '@/graphqlApi/workspace/mutation';
import { toast } from '@/components/ui/toast';
function useCreateWorkspace() {
  const [mutate, { data, loading, error }] = useMutation(CREATE_WORKSPACE, {
    onCompleted: (data) => {
      if (data.createWorkspace.success) {
        toast.add({
          title: 'Workspace Created',
          description: data.createWorkspace.message,
          variant: 'success',
        });
      } else {
        toast.add({
          title: 'Error',
          description: data.createWorkspace.message,
          variant: 'destructive',
        });
      }
    },

    onError: (error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
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
