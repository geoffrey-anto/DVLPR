import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { RegisterResolver } from "./modules/user/UserResolver";
import cookieParser = require("cookie-parser");
import { TweetResolver } from "./modules/tweet/TweetResolver";
import { ReplyResolver } from "./modules/reply/ReplyResolver";
require("dotenv").config();

const main = async () => {
  const AppDataSource = new DataSource({

    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: process.env.DATABASE_HOST,
    // port: parseInt(process.env.DATABASE_PORT as string),
    // username: process.env.DATABASE_USER as string,
    // password: process.env.DATABASE_PASSWORD as string,
    // database: process.env.DATABASE_NAME as string,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: true,
    logging: false,
    entities: ["dist/entity/**/*.js"],
    // cache: {
    //   duration: 100,
    //   type: "database"
    // }
  });

  AppDataSource.initialize();

  const app = express();

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers: [RegisterResolver, TweetResolver, ReplyResolver],
  });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    persistedQueries: false,
    cache: "bounded",
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:4000/graphql",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    },
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log("Server Running on http://localhost:4000");
  });
};

main();
