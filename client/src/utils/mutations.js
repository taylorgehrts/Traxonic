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

//LOGIN
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($username: String!, $verificationCode: String!) {
    verifyUser(username: $username, verificationCode: $verificationCode) {
      username
    }
  }
`;


export const ADD_PROJECT = gql`
  mutation AddProject($userId: ID, $title: String, $genre: String, $bpm: Int, $description: String) {
    addProject(userId: $userId, title: $title, genre: $genre, bpm: $bpm, description: $description) {
      id
      title
      genre
      bpm
      description
      ownerUsername  
    }
  }
`;
