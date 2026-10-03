import { gql } from '@apollo/client';

const FETCH_WORKSPACES = gql`
  query FetchWorkspaces {
    fetchWorkspaces {
      success
      message
      data {
        id
        name
        joinCode
      }
    }
  }
`;

const FETCH_WORKSPACE_BY_ID = gql`
  query FetchWorkspaceById($workspaceId: Int!) {
    getWorkSpace(workspaceId: $workspaceId) {
      success
      message
      data {
        id
        name
        joinCode
        createdAt
        updatedAt
      }
    }
  }
`;

export { FETCH_WORKSPACE_BY_ID, FETCH_WORKSPACES };
