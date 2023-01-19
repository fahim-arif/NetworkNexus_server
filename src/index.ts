import express, { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import cors from "cors";
import { json } from "body-parser";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import Keyv from "keyv";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";
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
    cache: new KeyvAdapter(new Keyv("redis://localhost:6379")),
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apolloServer.start();

  const app: Express = express();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer)
  );

  app.get("/", (_, res) => {
    res.send("Hello from express server");
  });

  const port = process.env.port || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

server().catch((error) => console.log(error));
