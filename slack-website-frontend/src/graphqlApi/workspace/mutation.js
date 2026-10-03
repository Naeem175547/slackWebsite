import { gql } from '@apollo/client';

const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($createWorkspaceInput: CreateWorkspaceInput!) {
    createWorkspace(createWorkspaceInput: $createWorkspaceInput) {
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

export { CREATE_WORKSPACE };
