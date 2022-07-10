// import { MyCtx } from "./../../../typings.d";
import { User } from "../../entity/User/User";
import {
  Arg,
  // Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import * as bcrypt from "bcrypt";
// import { sign } from "jsonwebtoken";

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
    const users = await User.find({});
    return users;
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg("id") id: number): Promise<User | null> {
    try {
      const user: User | null = await User.findOneBy({
        id,
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
    // @Ctx() ctx: MyCtx
  ) {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
      return null;
    }
    
    const isAuthenticated = await bcrypt.compare(password, user.password);
    
    if (isAuthenticated === false) return null;
    
    // const refreshToken = sign(
    //   {
    //     user_Id: user.id,
    //     user_UserName: user.username,
    //     user_Name: user.name,
    //     user_Email: user.email,
    //   },
    //   "dhufhiuehiogahgoerjpgjriog",
    //   {
    //     expiresIn: "7d",
    //   }
    // );

    // const acessToken = sign(
    //   {
    //     user_Id: user.id,
    //     user_UserName: user.username,
    //     user_Name: user.name,
    //     user_Email: user.email,
    //   },
    //   "dhufhiuehiogahgoerjpgjriog",
    //   {
    //     expiresIn: "15min",
    //   }
    // );

    // try {
    //   ctx?.res?.cookie("acess-token", acessToken, {
    //     expires: new Date(Date.now() + 60 * 60 * 24 * 7),
    //     httpOnly: true
    //   });
    //   ctx?.res?.cookie("refresh-token", refreshToken, {
    //     expires: new Date(Date.now() + 60 * 15),
    //     httpOnly: true
    //   });
    //   console.log("cookie")
    // } catch(err) {
    //   console.log(err);
    // }

    return user;
  }
}

export { RegisterResolver };
