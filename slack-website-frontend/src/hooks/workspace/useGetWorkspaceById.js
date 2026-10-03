import { useQuery } from '@apollo/client';
import { FETCH_WORKSPACE_BY_ID } from '@/graphqlApi/workspace/query';
const useGetWorkspaceById = (workspaceId) => {
  const { loading, error, data } = useQuery(FETCH_WORKSPACE_BY_ID, {
    variables: { workspaceId },
  });

  return {
    loading,
    error,
    workspace: data?.getWorkSpace?.data,
  };
};

export default useGetWorkspaceById;
