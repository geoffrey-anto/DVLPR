import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { RegisterResolver } from "./modules/user/UserResolver";

const corsOptions = {
  origin: ["https://www.your-app.example", "https://studio.apollographql.com"],
};

const main = async () => {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "geoffrey",
    database: "test2",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    // cache: {
    //   duration: 100,
    //   type: "database"
    // }
  });

  AppDataSource.initialize();

  const app = express();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  app.listen(4000, () => {
    console.log("Server Running on http://localhost:4000");
  });
};

main();
