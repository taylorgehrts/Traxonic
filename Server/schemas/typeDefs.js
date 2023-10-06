const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
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
    uploadedOn: String  # Assuming you want to store the date as a string for simplicity
  }
  
  type Message {
    id: ID
    user: User
    createdOn: String  # Assuming you want to store the date as a string for simplicity
    text: String
  }
  
  type Query {
    findUser(id: ID): User
    findByGenre(genre: String): [Project]
  }
  
  type Mutation {
    addUser(first: String, last: String, email: String, password: String): User
    updateProfile(userId: ID, location: String, bio: String, image: String): Profile
    addProject(userId: ID, title: String, genre: String, bpm: Int, description: String): Project
    removeProject(projectId: ID): Boolean
    updateProject(projectId: ID, title: String, genre: String, bpm: Int, description: String): Project
    addFile(projectId: ID, fileUrl: String): File
    removeFile(fileId: ID): Boolean
    addCollaborator(projectId: ID, userId: ID): Project
    removeCollaborator(projectId: ID, userId: ID): Project
    addMessage(projectId: ID, userId: ID, text: String): Message
    updateMessage(projectId: ID, messageId: ID, text: String): Message
    removeMessage(projectId: ID, messageId: ID): Boolean
  }
`;

module.exports = typeDefs;
