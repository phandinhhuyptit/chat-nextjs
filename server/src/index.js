require("dotenv").config();
import http from "http";
import cors from "cors";
import express from "express";
import { ApolloServer, gql, withFilter } from "apollo-server-express";

const PORT = parseInt(process.env.PORT, 10) || 9005;
const playground = (process.env.APOLLO_PLAYGROUND === "true" && true) || false;
const introspection =
  (process.env.APOLLO_INTROSPECTION === "true" && true) || false;
const debug = (process.env.APOLLO_DEBUG === "true" && true) || false;

const whitelist = process.env.SERVER_REQUEST_WHITE_LIST;
const corsEnabled = process.env.SERVER_CORS_ENABLED;
const path = process.env.APOLLO_PATH || "/graphql";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection,
  playground,
  debug,
  subscriptions: {
    path,
  },
});

let app = express();

let corsOptions = {
  origin: function (origin, callback) {
    if (!origin) console.log("origin: ", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed access!"));
    }
  },
};

if (corsEnabled !== "true") {
  corsOptions = {};
}

app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: "Not allowed access!" });
});

server.applyMiddleware({ app, path, cors: false });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});
