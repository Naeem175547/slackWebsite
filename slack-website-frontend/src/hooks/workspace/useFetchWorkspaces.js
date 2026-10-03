import { useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { FETCH_WORKSPACES } from '@/graphqlApi/workspace/query';
import { toast } from '@/components/ui/toast';

export const useFetchWorkspaces = () => {
  const { data, loading, error } = useQuery(FETCH_WORKSPACES);

  useEffect(() => {
    if (data && !data.fetchWorkspaces?.success) {
      toast.add({
        title: 'Error',
        description: data.fetchWorkspaces?.message,
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
    workspaces: data?.fetchWorkspaces?.data,
    loading,
    error,
  };
};

export default useFetchWorkspaces;
