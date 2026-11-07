import { gql } from '@apollo/client';

export const GET_PAGINATED_MESSAGES = gql`
  query GetPaginatedMessages(
    $messageParams: MessageParams!
    $page: Int
    $limit: Int
  ) {
    getPaginatedMessage(
      messageParams: $messageParams
      page: $page
      limit: $limit
    ) {
      success
      message
      data {
        id
        body
        image
        createdAt
        updatedAt
        user {
          id
          name
          username
          avatar
        }
      }
    }
  }
`;

export const GET_PRESIGNED_URL = gql`
  query GetPresignedUrl {
    getPresignedUrl {
      success
      message
      data
    }
  }
`;
