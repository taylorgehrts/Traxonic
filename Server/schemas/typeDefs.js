const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    username: String
    first: String
    last: String
    email: String
    password: String
  }
  
  type Profile {
    id: ID
    user: User
    projects: [Project]
    location: String
    bio: String
    image: String
    links: [String]
  }
  
  type Project {
    id: ID
    title: String
    genre: String
    bpm: Int
    description: String
    image: String
    files: [File]
    collaborators: [User]
    messages: [Message]
  }
  
  type File {
    id: ID
    url: String
    duration: Int
    size: Int
    uploadedOn: String
  }
  
  type Message {
    id: ID
    user: User
    createdOn: String
    text: String
  }

  type Token {
    token: String
  }
  
  type Query {
    findUser(id: ID): User
    findUserByUsername(username: String): User
    findAllUsers: [User] # New query to find all users
    findByGenre(genre: String): [Project]
  }
  
  type Mutation {
    addUser(username: String, first: String, last: String, email: String, password: String): User
    updateUser(userId: ID, username: String, first: String, last: String, email: String): User
    removeUser(userId: ID): Boolean
    login(email: String, password: String): Token # New mutation for login
    logout: Boolean # New mutation for logout
    addProfile(userId: ID, location: String, bio: String, image: String, links: [String]): Profile
    updateProfile(userId: ID, location: String, bio: String, image: String, links: [String]): Profile
    removeProfile(profileId: ID): Boolean
    addProject(userId: ID, title: String, genre: String, bpm: Int, description: String): Project
    removeProject(projectId: ID): Boolean
    updateProject(projectId: ID, title: String, genre: String, bpm: Int, description: String): Project
    addFile(projectId: ID, fileUrl: String, duration: Int, size: Int): File
    removeFile(fileId: ID): Boolean
    addCollaborator(projectId: ID, userId: ID): Project
    removeCollaborator(projectId: ID, userId: ID): Project
    addMessage(projectId: ID, userId: ID, text: String): Message
    updateMessage(projectId: ID, messageId: ID, text: String): Message
    removeMessage(projectId: ID, messageId: ID): Boolean
  }
  
`;

module.exports = typeDefs;
