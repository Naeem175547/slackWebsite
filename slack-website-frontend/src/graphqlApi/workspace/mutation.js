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
const UPDATE_WORKSPACE=gql`
mutation UpdateWorkspace($workspaceId:Int!,$updateWorkspaceInput:UpdateWorkspaceInput!){
    UpdateWorkspace(workspaceId:$workspaceId,updateWorkspaceInput:$updateWorkspaceInput){
    success
    message
    data{
    id
    name
    joinCode
    }
}
}
`

const DELETE_WORKSPACE=gql`
mutation deleteWorkspace($workspaceId:Int!){
    deleteWorkspace(workspaceId:$workspaceId){
    success
    message
    data{
    id
    name
    }
}
}
`

export { CREATE_WORKSPACE ,UPDATE_WORKSPACE,DELETE_WORKSPACE};


