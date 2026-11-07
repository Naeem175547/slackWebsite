import { gql } from '@apollo/client';

export const signUp = gql`
  mutation SignUp($signUpInput: CreateUserInput!) {
    signUp(createUserInput: $signUpInput) {
      success
      message
      data {
        username
        email
        id
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;

export const signIn = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      success
      message
      data {
        user {
          username
          email
          id
          avatar
          createdAt
          updatedAt
        }
        accessToken
      }
    }
  }
`;
