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

const ADD_CHANNEL_TO_WORKSPACE=gql`
mutation AddChannelToWorkspace(
  $workspaceId: Int!
  $channelName: String!
) {
  addChannelToWorkspace(
    workspaceId: $workspaceId
    channelName: $channelName
  ) {
    success
    message
    data {
      id
      name
      description
      joinCode
      createdAt
    }
  }
}

`

const RESET_JOIN_CODE=gql`
mutation ResetJoinCode($workspaceId:Int!){
    resetJoinCodeController(workspaceId:$workspaceId){
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

export { CREATE_WORKSPACE ,UPDATE_WORKSPACE,DELETE_WORKSPACE,ADD_CHANNEL_TO_WORKSPACE,RESET_JOIN_CODE};


