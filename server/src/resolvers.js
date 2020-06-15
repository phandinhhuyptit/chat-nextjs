require("dotenv").config();
import { withFilter } from "graphql-subscriptions";
import Redis from "./redis";
import pubsub from "./pubsub";

export default {
  Query: {
    Users: async () => {
      const keys = await Redis.keys("user*");

      const pipeline = Redis.pipeline();

      keys.forEach((key) => pipeline.hgetall(key));

      const data = await pipeline.exec();
      return data
        .sort((a, b) => (Number(a[1].userId) > Number(b[1].userId) ? 1 : -1))
        .map((item) => item[1]);
    },
    ChatHistory: async () => {
      const keys = await Redis.keys("chat*");

      const pipeline = Redis.pipeline();

      keys.forEach((key) => pipeline.hgetall(key));

      const data = await pipeline.exec();

      return data
        .sort((a, b) =>
          Number(a[1].mesageId) > Number(b[1].mesageId) ? 1 : -1
        )
        .map(async (item) => {
          const user = await Redis.hgetall(`user_${item[1].userId}`);
          return { ...item[1], user };
        });
    },
    ChatHistoryByRoom: async (_, { chatRoomId }) => {
      const keys = await Redis.keys(`chat_${chatRoomId}*`);

      const pipeline = Redis.pipeline();

      keys.forEach((key) => pipeline.hgetall(key));
      const data = await pipeline.exec();
      return data
        .sort((a, b) =>
          Number(a[1].mesageId) > Number(b[1].mesageId) ? 1 : -1
        )
        .map(async (item) => {
          const user = await Redis.hgetall(`user_${item[1].userId}`);
          return { ...item[1], user };
        });
    },
    ChatRooms: async () => {
      const keys = await Redis.keys("room*");

      const pipeline = Redis.pipeline();

      keys.forEach((key) => pipeline.hgetall(key));

      const data = await pipeline.exec();
      return data
        .sort((a, b) =>
          Number(a[1].chatRoomId) > Number(b[1].chatRoomId) ? 1 : -1
        )
        .map((item) => item[1]);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      await Redis.hmset(`user_${input.userId}`, input);
      const data = await Redis.hgetall(`user_${input.userId}`);
      pubsub.publish("USER", {
        createUserRealtime: data,
      });
      return data;
    },
    createChatRoom: async (_, { input }) => {
      await Redis.hmset(`room_${input.chatRoomId}`, input);
      const data = await Redis.hgetall(`room_${input.chatRoomId}`);
      pubsub.publish("ROOM", {
        createChatRoomRealtime: data,
      });
      return data;
    },
    sendMessageByRoom: async (_, { input }) => {
      await Redis.hmset(`chat_${input.roomId}_${input.mesageId}`, input);
      const data = await Redis.hgetall(
        `chat_${input.roomId}_${input.mesageId}`
      );
      const user = await Redis.hgetall(`user_${input.userId}`);

      const { userId, ...rest } = data;
      const returnData = { ...rest, user };
      pubsub.publish("MESSAGE", {
        messageRealtime: returnData,
      });
      pubsub.publish("MESSAGEBYROOM", {
        messageRealtimeByRoom: returnData,
      });
      return returnData;
    },
  },
  Subscription: {
    messageRealtime: {
      subscribe: () => pubsub.asyncIterator("MESSAGE"),
    },
    createUserRealtime: {
      subscribe: () => pubsub.asyncIterator("USER"),
    },
    createChatRoomRealtime: {
      subscribe: () => pubsub.asyncIterator("ROOM"),
    },
    messageRealtimeByRoom: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("MESSAGEBYROOM"),
        (payload, variables) => {
          return (
            payload && payload.messageRealtimeByRoom.roomId === variables.roomId
          );
        }
      ),
    },
  },
};
