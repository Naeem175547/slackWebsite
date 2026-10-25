import { gql } from "@apollo/client";

export const GET_CHANNEL_BY_ID = gql`
  query GetChannelsById($channelId: Int!) {
    getChannelById(channelId: $channelId) {
      message
      success
      data{
      id
      name
      createdAt
      updatedAt
      messages{
      id
      }


      }
    }
  }
`;