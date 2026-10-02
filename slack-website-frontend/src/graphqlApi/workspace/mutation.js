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

export { CREATE_WORKSPACE };
