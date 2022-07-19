"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const UserResolver_1 = require("./modules/user/UserResolver");
const cookieParser = require("cookie-parser");
const TweetResolver_1 = require("./modules/tweet/TweetResolver");
const ReplyResolver_1 = require("./modules/reply/ReplyResolver");
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const AppDataSource = new typeorm_1.DataSource({
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: true,
        entities: ["dist/entity/**/*.js"],
    });
    AppDataSource.initialize();
    const app = (0, express_1.default)();
    app.use(cookieParser());
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolver_1.RegisterResolver, TweetResolver_1.TweetResolver, ReplyResolver_1.ReplyResolver],
    });
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });
    yield server.start();
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
    app.listen(4000, () => {
        console.log("Server Running on http://localhost:4000");
    });
});
main();
//# sourceMappingURL=index.js.map