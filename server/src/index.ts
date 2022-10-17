import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { DataSource } from "typeorm";

import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolver/user";

const server = async () => {
  const connection = new DataSource({
    type: "postgres",
    database: "chat-app",
    entities: [],
    logging: true,
    synchronize: true,
    username: "postgres",
    password: "postgres",
    host: "172.25.160.1",
    port: 5432,
  });

  connection
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
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
