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
exports.ReplyResolver = void 0;
const Reply_1 = require("../../entity/Reply/Reply");
const type_graphql_1 = require("type-graphql");
const Tweet_1 = require("../../entity/Tweet/Tweet");
const jsonwebtoken_1 = require("jsonwebtoken");
let ReplyResolver = class ReplyResolver {
    getReplies(id, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return null;
            const tweet = yield Tweet_1.Tweet.find({ where: { id }, relations: ["replies"] });
            if (tweet.length === 0)
                return [];
            const replies = tweet[0].replies;
            if (replies.length === 0)
                return [];
            return replies;
        });
    }
    addReplyForTweet(tweetId, description, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined)
                return false;
            const tweet = yield Tweet_1.Tweet.findOne({
                where: {
                    id: tweetId,
                },
                relations: ["replies"]
            });
            if (tweet === null)
                return false;
            const reply = new Reply_1.Reply();
            const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
            const userName = token.user_UserName;
            reply.repliedUsername = userName;
            reply.description = description;
            reply.likes = 1;
            reply.tweet = tweet;
            tweet.replyCount = !tweet.replyCount ? 0 : tweet.replyCount;
            yield reply.tweet.save();
            yield reply.save();
            return true;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Reply_1.Reply]),
    __param(0, (0, type_graphql_1.Arg)("tweetId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getReplies", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("tweetId")),
    __param(1, (0, type_graphql_1.Arg)("description")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "addReplyForTweet", null);
ReplyResolver = __decorate([
    (0, type_graphql_1.Resolver)(Reply_1.Reply)
], ReplyResolver);
exports.ReplyResolver = ReplyResolver;
//# sourceMappingURL=ReplyResolver.js.map