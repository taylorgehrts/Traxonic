import { gql } from '@apollo/client';

// ADD_USER mutation
export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $first: String!
    $last: String!
    $email: String!
    $password: String!
  ) {
    addUser(username: $username, first: $first, last: $last, email: $email, password: $password) {
      id
      username
      first
      last
      email
    }
  }
`;

//LOGIN_MUTATION
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      
    }
  }
`;
