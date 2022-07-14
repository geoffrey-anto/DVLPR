require("dotenv").config();
import { MyCtx, tokenResponse } from "./../../../typings.d";
import { User } from "../../entity/User/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

@InputType()
class userInputData {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@InputType()
class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@Resolver(User)
class RegisterResolver {
  // Queries
  @Query(() => [User], { nullable: false })
  async getUsers(): Promise<User[]> {
    const users = await User.find({ relations: ["tweets"] });
    return users;
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg("id") id: number): Promise<User | null> {
    try {
      const user: User | null = await User.findOne({
        where: { id },
        relations: ["tweets"],
      });
      if (user !== null) {
        return user;
      }
    } catch (err) {
      console.log(err);
    }
    // User is going to be null here
    return null;
  }

  //Mutations
  @Mutation(() => Boolean)
  async Register(
    @Arg("data") { name, username, email, password }: userInputData
  ): Promise<Boolean> {
    if (name.length < 3) return false;
    if (username.length < 6) return false;
    if (!validateEmail(email)) return false;
    const hash = await bcrypt.hash(password, 12);
    try {
      const user = User.create({
        name,
        username,
        email,
        password: hash as string,
      });
      await user.save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => User, { nullable: true })
  async Login(
    @Arg("LoginInput") { email, password }: LoginInput,
    @Ctx() ctx: MyCtx
  ) {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return null;
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);

    if (isAuthenticated === false) return null;

    const refreshToken = sign(
      {
        user_Id: user.id,
        user_UserName: user.username,
        user_Name: user.name,
        user_Email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    const accessToken = sign(
      {
        user_Id: user.id,
        user_UserName: user.username,
        user_Name: user.name,
        user_Email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "15min",
      }
    );

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
    } catch (err) {
      console.log(err);
    }
    return user;
  }

  @Mutation(() => Boolean, { nullable: true })
  async changeUsername(
    @Arg("email") email: string,
    @Arg("newUsername") newUsername: string,
    @Ctx() ctx: MyCtx
  ) {
    if (ctx.req.cookies["access-token"] === undefined) {
      return false;
    }
    const token: tokenResponse = verify(
      ctx.req.cookies["access-token"],
      process.env.JWT_SECRET as string
    ) as tokenResponse;
    if (email === token.user_Email) {
      const user = await User.findOneBy({ email });
      if (user === null) {
        return false;
      }
      user.username = newUsername;
      await user.save();
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyCtx
  ): Promise<boolean> {
    if (ctx.req.cookies["access-token"] === undefined) {
      return false;
    }
    try {
      const token: tokenResponse = verify(
        ctx.req.cookies["access-token"],
        process.env.JWT_SECRET as string
      ) as tokenResponse;

      const user = await User.findOneBy({ email });
      if (user === null) {
        return false;
      }

      if (user.email !== token.user_Email) {
        return false;
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (isValid === false) {
        return false;
      }

      await User.delete({ email });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async changeUserPassword(
    @Arg("email") email: string,
    @Arg("oldPassword") oldPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() ctx: MyCtx
  ): Promise<boolean> {
    if (ctx.req.cookies["access-token"] === undefined) {
      return false;
    }
    try {
      const user = await User.findOneBy({ email });
      if (user === null) {
        return false;
      }
      const token: tokenResponse = verify(
        ctx.req.cookies["access-token"],
        process.env.JWT_SECRET as string
      ) as tokenResponse;

      if (token.user_Email !== email) {
        return false;
      }

      const isValidOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (!isValidOldPassword) return false;

      const newPasswordHash = await bcrypt.hash(newPassword, 12);

      user.password = newPasswordHash as string;

      await user.save();

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export { RegisterResolver };
