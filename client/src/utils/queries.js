import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects($userId: ID) {
  getProjects(userId: $userId) {
    id
    title
    genre
    bpm
    description
    ownerUsername
    
    
    
  }
}
`;

export const FIND_USER = gql`
  query FindUser($id: ID!) {
    findUser(id: $id) {
      id
      username
      
    }
  }
`;
export const FIND_PROJECT_BY_ID = gql`
  query FindProjectById($projectId: ID!) {
    findProjectById(projectId: $projectId) {
      id
      title
      genre
      bpm
      description
      ownerUsername
      
    }
  }
`;

export const FIND_PROFILE_BY_ID = gql`
query FindProfileById($userId: ID!) {
  findProfileById(userId: $userId) {
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