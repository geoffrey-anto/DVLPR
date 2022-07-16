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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const User_1 = require("./../User/User");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Reply_1 = require("../Reply/Reply");
let Tweet = class Tweet extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Tweet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: new Date().toString() }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Tweet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Tweet.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Tweet.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Tweet.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Tweet.prototype, "isRepost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Tweet.prototype, "repostCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tweet.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reply_1.Reply, (reply) => reply.tweet, { nullable: true }),
    (0, type_graphql_1.Field)(() => [Reply_1.Reply], { nullable: true }),
    __metadata("design:type", Array)
], Tweet.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.tweets, { nullable: true }),
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], Tweet.prototype, "user", void 0);
Tweet = __decorate([
    (0, typeorm_1.Entity)(),
    (0, type_graphql_1.ObjectType)()
], Tweet);
exports.Tweet = Tweet;
//# sourceMappingURL=Tweet.js.map