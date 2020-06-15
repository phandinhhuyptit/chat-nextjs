import { gql } from "apollo-server-express";

export default gql`
  type ChatRoomPayload {
    chatRoomId: String
    name: String
  }

  type UserPayload {
    userId: String
    name: String
  }

  type MessagePayload {
    mesageId: String
    content: String
    user: UserPayload
    roomId: String
  }

  type SendMessagePayload {
    mesageId: String
    content: String
    user: UserPayload
    roomId: String
  }

  type Query {
    Users: [UserPayload]
    ChatHistory: [MessagePayload]
    ChatRooms: [ChatRoomPayload]
    ChatHistoryByRoom(chatRoomId: String): [MessagePayload]
  }

  type Mutation {
    createUser(input: UserInput!): UserPayload
    createChatRoom(input: ChatRoomInput!): ChatRoomPayload
    sendMessageByRoom(input: SendMessageInput!): SendMessagePayload
  }

  type Subscription {
    messageRealtime: MessagePayload
    messageRealtimeByRoom(roomId: String!): MessagePayload
    createUserRealtime: UserPayload
    createChatRoomRealtime: ChatRoomPayload
  }

  input MessageInput {
    mesageId: String!
    content: String
    userId: String!
  }

  input SendMessageInput {
    mesageId: String!
    content: String
    userId: String!
    roomId: String!
  }

  input UserInput {
    userId: String
    name: String
  }

  input ChatRoomInput {
    chatRoomId: String
    name: String
  }
`;
