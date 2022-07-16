"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetResolver = void 0;
const User_1 = require("./../../entity/User/User");
require("dotenv").config();
const jsonwebtoken_1 = require("jsonwebtoken");
const Tweet_1 = require("../../entity/Tweet/Tweet");
const type_graphql_1 = require("type-graphql");
const Reply_1 = require("../../entity/Reply/Reply");
let TweetInput = class TweetInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TweetInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TweetInput.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], TweetInput.prototype, "isRepost", void 0);
TweetInput = __decorate([
    (0, type_graphql_1.InputType)()
], TweetInput);
let TweetResolver = class TweetResolver {
    getAllTweets(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return null;
            const tweets = yield Tweet_1.Tweet.find({
                relations: ["user"],
                order: {
                    id: {
                        direction: "DESC",
                    },
                },
            });
            if (tweets.length === 0)
                return [];
            return tweets;
        });
    }
    getTweetById(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return null;
            const tweet = yield Tweet_1.Tweet.findOne({
                where: { id: id },
                relations: ["user"],
            });
            return tweet;
        });
    }
    getTweetsForUser(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return null;
            const tweets = yield Tweet_1.Tweet.find({
                where: { userId: id },
                relations: ["user", "replies"],
            });
            return tweets;
        });
    }
    addTweet(userId, x, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return false;
            const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
            if (token.user_Id !== userId) {
                return false;
            }
            const user = yield User_1.User.findOneBy({ id: userId });
            if (user === null)
                return false;
            const tweet = new Tweet_1.Tweet();
            [tweet.description, tweet.image, tweet.isRepost, tweet.likes] = [
                x.description,
                x.image,
                x.isRepost,
                0,
            ];
            tweet.createdAt = new Date().toString();
            tweet.userId = user.id;
            tweet.user = user;
            yield tweet.user.save();
            yield tweet.save();
            return true;
        });
    }
    likeTweet(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return false;
            const tweet = yield Tweet_1.Tweet.findOne({ where: { id } });
            if (tweet === null)
                return false;
            tweet.likes += 1;
            yield tweet.save();
            return true;
        });
    }
    retweetTweet(tweetId, userId, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return false;
            const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
            if (token.user_Id !== userId) {
                return false;
            }
            const tweet = yield Tweet_1.Tweet.findOne({
                where: {
                    id: tweetId,
                },
                relations: ["user"],
            });
            if ((tweet === null || tweet === void 0 ? void 0 : tweet.user.id) === userId)
                return false;
            const currUser = yield User_1.User.findOne({ where: { id: userId } });
            if (tweet === null || currUser === null) {
                return false;
            }
            if (tweet.user.id === userId)
                return false;
            const newTweet = new Tweet_1.Tweet();
            [newTweet.description, newTweet.image, newTweet.user, newTweet.likes] = [
                tweet.description,
                tweet.image,
                currUser,
                0,
            ];
            tweet.repostCount = tweet.repostCount !== null ? tweet.repostCount + 1 : 1;
            yield tweet.save();
            newTweet.createdAt = new Date().toString();
            newTweet.repostCount = 0;
            newTweet.userId = userId;
            newTweet.isRepost = true;
            yield newTweet.user.save();
            yield newTweet.save();
            return true;
        });
    }
    deleteTweet(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return null;
            const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
            const tweet = yield Tweet_1.Tweet.findOne({
                where: { id: id },
                relations: ["user", "replies"],
            });
            if (tweet === null)
                return false;
            if (token.user_Id !== tweet.user.id) {
                return false;
            }
            if (tweet.replies !== undefined) {
                for (let i = 0; i < tweet.replies.length; i++) {
                    yield Reply_1.Reply.delete({ id: tweet.replies[i].id });
                }
            }
            yield Tweet_1.Tweet.delete({ id: tweet.id });
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Tweet_1.Tweet], { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "getAllTweets", null);
__decorate([
    (0, type_graphql_1.Query)(() => Tweet_1.Tweet, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("tweetId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "getTweetById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Tweet_1.Tweet], { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "getTweetsForUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("tweetInput")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, TweetInput, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "addTweet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "likeTweet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("tweetId")),
    __param(1, (0, type_graphql_1.Arg)("userId")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "retweetTweet", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("tweetId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TweetResolver.prototype, "deleteTweet", null);
TweetResolver = __decorate([
    (0, type_graphql_1.Resolver)(Tweet_1.Tweet)
], TweetResolver);
exports.TweetResolver = TweetResolver;
//# sourceMappingURL=TweetResolver.js.map