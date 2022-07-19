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
exports.Reply = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Tweet_1 = require("../Tweet/Tweet");
let Reply = class Reply extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Reply.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "none" }),
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], Reply.prototype, "repliedUsername", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tweet_1.Tweet, (tweet) => tweet.replies, { nullable: true }),
    (0, type_graphql_1.Field)(() => [Tweet_1.Tweet], { nullable: true }),
    __metadata("design:type", Tweet_1.Tweet)
], Reply.prototype, "tweet", void 0);
Reply = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Reply);
exports.Reply = Reply;
//# sourceMappingURL=Reply.js.map