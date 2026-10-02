const FETCH_WORKSPACES = gql`
  query FetchWorkspaces {
    fetchWorkspaces {
      success
      message
      data {
        id
        name
        JoinCode
        createdAt
        updatedAt
      }
    }
  }
`;

export { FETCH_WORKSPACES };
