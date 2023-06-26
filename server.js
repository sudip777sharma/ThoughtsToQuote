import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import typeDefs from "./schemaGql.js";

import express from "express";
import http from "http";
import path from "path";
const __dirname = path.resolve();

const port = process.env.PORT || 4000;

const app = express();
const httpServer = http.createServer(app);

import mongoose from "mongoose";

import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose
  .connect(process.env.APP_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("connecting to mongodb", err);
  });

// import models
import "./models/User.js";
import "./models/Quotes.js";

import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";

const context = ({ req }) => {
  const { authorization } = req.headers;
  // console.log("authorization", authorization);
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.APP_JWT_SECRET);
    // console.log("userId", userId);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});

// if(process.env.NODE_ENV == 'production'){
app.use(express.static("app_frontend/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "app_frontend", "dist", "index.html"));
});
// }

await server.start();
server.applyMiddleware({
  app,
  path: "/graphql",
});

httpServer.listen({ port }, () => {
  console.log(
    `🚀 Server listening at http://localhost:${port}${server.graphqlPath}`
  );
});
