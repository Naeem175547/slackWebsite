import { useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';
import { toast } from '@/components/ui/toast';

export const useGetWorkspaceById = (workspaceId) => {
  const { data, loading, error } = useQuery(FETCH_WORKSPACE_BY_ID, {
    variables: { workspaceId: Number(workspaceId) },
    skip: !workspaceId,
  });

  useEffect(() => {
    if (data && !data.getWorkSpace?.success) {
      toast.add({
        title: 'Error',
        description: data.getWorkSpace?.message,
        type: 'error',
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.add({
        title: 'Error',
        description: error.message,
        type: 'error',
      });
    }
  }, [error]);

  return {
    workspace: data?.getWorkSpace?.data,
    loading,
    isFetching: loading,
    isSuccess:data,
    error,
  };
};

export default useGetWorkspaceById;
