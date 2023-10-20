import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $first: String!
    $last: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      first: $first
      last: $last
      email: $email
      password: $password
    ) {
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
  mutation AddProject(
    $userId: ID
    $title: String
    $genre: String
    $bpm: Int
    $description: String
  ) {
    addProject(
      userId: $userId
      title: $title
      genre: $genre
      bpm: $bpm
      description: $description
    ) {
      id
      title
      genre
      bpm
      description
      ownerUsername
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation AddProfile(
    $userId: ID!
    $location: String!
    $bio: String!
    $image: String!
    $links: [LinkInput]!
  ) {
    addProfile(
      userId: $userId
      location: $location
      bio: $bio
      image: $image
      links: $links
    ) {
      id
      location
      bio
      image
      links {
        title
        url
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $userId: ID!
    $location: String!
    $bio: String!
    $image: String!
    $links: [LinkInput]!
  ) {
    updateProfile(
      userId: $userId
      location: $location
      bio: $bio
      image: $image
      links: $links
    ) {
      id
      location
      bio
      image
      links {
        title
        url
      }
    }
  }
`;
export const REMOVE_PROJECT = gql`
  mutation RemoveProject($projectId: ID) {
    removeProject(projectId: $projectId)
  }
`;
