import express, { Express } from "express";

const server = async () => {
  const app: Express = express();

  app.get("/", (_, res) => {
    res.send("Hello World");
  });

  const port = process.env.port || 5000;
  app.listen(port, () => console.log(`Server started on port ${port}`));
};

server().catch((error) => console.log(error));
