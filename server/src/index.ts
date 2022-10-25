import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers";
import postgres from "./database/postgres";

const server = async () => {
  postgres
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) =>
      console.log("Error during Data Source initialization ", error)
    );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    plugins: [
      process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  const app: Express = express();

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const port = process.env.port || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

server().catch((error) => console.log(error));
