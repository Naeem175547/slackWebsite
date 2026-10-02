const useFetchWorkspaces = () => {
  const { data, loading, error } = useQuery(FETCH_WORKSPACES, {
    onCompleted: (data) => {
      if (!data.fetchWorkspaces.success) {
        toast.add({
          title: 'Error',
          description: data.fetchWorkspaces.message,
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
  return { data, loading, error };
};
