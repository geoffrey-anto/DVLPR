"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.RegisterResolver = void 0;
require("dotenv").config();
const User_1 = require("../../entity/User/User");
const type_graphql_1 = require("type-graphql");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
let userInputData = class userInputData {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], userInputData.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], userInputData.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], userInputData.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], userInputData.prototype, "password", void 0);
userInputData = __decorate([
    (0, type_graphql_1.InputType)()
], userInputData);
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let RegisterResolver = class RegisterResolver {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find({ relations: ["tweets"] });
            return users;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.User.findOne({
                    where: { id },
                    relations: ["tweets"],
                });
                if (user !== null) {
                    return user;
                }
            }
            catch (err) {
                console.log(err);
            }
            return null;
        });
    }
    Register({ name, username, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (name.length < 3)
                return false;
            if (username.length < 6)
                return false;
            if (!validateEmail(email))
                return false;
            const hash = yield bcrypt.hash(password, 12);
            try {
                const user = User_1.User.create({
                    name,
                    username,
                    email,
                    password: hash,
                });
                yield user.save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    Login({ email, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (user === null) {
                return null;
            }
            const isAuthenticated = yield bcrypt.compare(password, user.password);
            if (isAuthenticated === false)
                return null;
            const refreshToken = (0, jsonwebtoken_1.sign)({
                user_Id: user.id,
                user_UserName: user.username,
                user_Name: user.name,
                user_Email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            const accessToken = (0, jsonwebtoken_1.sign)({
                user_Id: user.id,
                user_UserName: user.username,
                user_Name: user.name,
                user_Email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: "15min",
            });
            try {
                ctx.res.cookie("access-token", accessToken, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                ctx.res.cookie("refresh-token", refreshToken, {
                    expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000),
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
            }
            catch (err) {
                console.log(err);
            }
            return user;
        });
    }
    changeUsername(email, newUsername, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined) {
                return false;
            }
            const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
            if (email === token.user_Email) {
                const user = yield User_1.User.findOneBy({ email });
                if (user === null) {
                    return false;
                }
                user.username = newUsername;
                yield user.save();
                return true;
            }
            else {
                return false;
            }
        });
    }
    deleteUser(email, password, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined) {
                return false;
            }
            try {
                const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
                const user = yield User_1.User.findOneBy({ email });
                if (user === null) {
                    return false;
                }
                if (user.email !== token.user_Email) {
                    return false;
                }
                const isValid = yield bcrypt.compare(password, user.password);
                if (isValid === false) {
                    return false;
                }
                yield User_1.User.delete({ email });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    changeUserPassword(email, oldPassword, newPassword, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ctx.req.cookies["access-token"] === undefined) {
                return false;
            }
            try {
                const user = yield User_1.User.findOneBy({ email });
                if (user === null) {
                    return false;
                }
                const token = (0, jsonwebtoken_1.verify)(ctx.req.cookies["access-token"], process.env.JWT_SECRET);
                if (token.user_Email !== email) {
                    return false;
                }
                const isValidOldPassword = yield bcrypt.compare(oldPassword, user.password);
                if (!isValidOldPassword)
                    return false;
                const newPasswordHash = yield bcrypt.hash(newPassword, 12);
                user.password = newPasswordHash;
                yield user.save();
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
    getTopUsers(limit, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (limit < 1)
                return [];
            if (ctx.req.cookies["access-token"] === undefined) {
                return [];
            }
            try {
                const users = yield User_1.User.find({
                    relations: ["tweets"]
                });
                users.sort((a, b) => {
                    if (a.tweets.length > b.tweets.length)
                        return -1;
                    if (a.tweets.length < b.tweets.length)
                        return 1;
                    return 0;
                });
                return users.slice(0, limit);
            }
            catch (e) {
                console.log(e);
            }
            return [];
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User], { nullable: false }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "getUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userInputData]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "Register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("LoginInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "Login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("newUsername")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "changeUsername", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("password")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Arg)("oldPassword")),
    __param(2, (0, type_graphql_1.Arg)("newPassword")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "changeUserPassword", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Arg)("limit")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "getTopUsers", null);
RegisterResolver = __decorate([
    (0, type_graphql_1.Resolver)(User_1.User)
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
//# sourceMappingURL=UserResolver.js.map