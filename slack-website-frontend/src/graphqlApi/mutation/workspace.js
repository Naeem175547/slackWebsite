import { gql } from '@apollo/client';

const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($createWorkspaceInput: CreateWorkspaceInput!) {
    createWorkspace(createWorkspaceInput: $createWorkspaceInput) {
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

export { CREATE_WORKSPACE, FETCH_WORKSPACES };
