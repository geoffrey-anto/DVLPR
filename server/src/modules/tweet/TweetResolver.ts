import { User } from "./../../entity/User/User";
require("dotenv").config();
import { verify } from "jsonwebtoken";
import { Tweet } from "../../entity/Tweet/Tweet";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyCtx, tokenResponse } from "typings";
import { Reply } from "../../entity/Reply/Reply";

@InputType()
class TweetInput {
  @Field(() => String)
  description: string;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => Boolean)
  isRepost: boolean;
}

@Resolver(Tweet)
class TweetResolver {
  @Query(() => [Tweet], { nullable: true })
  async getAllTweets(@Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["access-token"] === undefined) return null;

    // const token: tokenResponse = verify(
    //   ctx.req.cookies["access-token"],
    //   process.env.JWT_SECRET as string
    // ) as tokenResponse;

    // if (token.user_Id !== id) {
    //   return null;
    // }

    const tweets = await Tweet.find({
      relations: ["user", "replies"],
      order: {
        id: {
          direction: "DESC",
        },
      },
    });

    if (tweets.length === 0) return [];

    return tweets;
  }

  @Query(() => Tweet, { nullable: true })
  async getTweetById(@Arg("tweetId") id: number, @Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["access-token"] === undefined) return null;

    const tweet = await Tweet.findOne({
      where: { id: id },
      relations: ["user"],
    });

    return tweet;
  }

  @Query(() => [Tweet], { nullable: true })
  async getTweetsForUser(@Arg("id") id: number, @Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["access-token"] === undefined) return null;

    // const token: tokenResponse = verify(
    //   ctx.req.cookies["access-token"],
    //   process.env.JWT_SECRET as string
    // ) as tokenResponse;

    // if (token.user_Id !== id) {
    //   return null;
    // }

    const tweets = await Tweet.find({
      where: { userId: id },
      relations: ["user", "replies"],
    });

    return tweets;
  }

  @Mutation(() => Boolean)
  async addTweet(
    @Arg("id") userId: number,
    @Arg("tweetInput") x: TweetInput,
    @Ctx() ctx: MyCtx
  ) {
    if (ctx.req.cookies["access-token"] === undefined) return false;

    const token: tokenResponse = verify(
      ctx.req.cookies["access-token"],
      process.env.JWT_SECRET as string
    ) as tokenResponse;

    if (token.user_Id !== userId) {
      return false;
    }

    const user = await User.findOneBy({ id: userId });

    if (user === null) return false;

    const tweet = new Tweet();

    [tweet.description, tweet.image, tweet.isRepost, tweet.likes] = [
      x.description,
      x.image,
      x.isRepost,
      0,
    ];

    tweet.createdAt = new Date().toString();

    tweet.userId = user.id;

    tweet.user = user;

    await tweet.user.save();

    await tweet.save();

    return true;
  }

  @Mutation(() => Boolean)
  async likeTweet(@Arg("id") id: number, @Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["access-token"] === undefined) return false;

    const tweet = await Tweet.findOne({ where: { id } });

    if (tweet === null) return false;

    tweet.likes += 1;

    await tweet.save();

    return true;
  }

  @Mutation(() => Boolean)
  async retweetTweet(
    @Arg("tweetId") tweetId: number,
    @Arg("userId") userId: number,
    @Ctx() ctx: MyCtx
  ) {
    if (ctx.req.cookies["access-token"] === undefined) return false;

    const token: tokenResponse = verify(
      ctx.req.cookies["access-token"],
      process.env.JWT_SECRET as string
    ) as tokenResponse;

    if (token.user_Id !== userId) {
      return false;
    }

    const tweet = await Tweet.findOne({
      where: {
        id: tweetId,
      },
      relations: ["user"],
    });

    if (tweet?.user.id === userId) return false;

    const currUser = await User.findOne({ where: { id: userId } });

    if (tweet === null || currUser === null) {
      return false;
    }

    if (tweet.user.id === userId) return false;

    const newTweet = new Tweet();

    [newTweet.description, newTweet.image, newTweet.user, newTweet.likes] = [
      tweet.description,
      tweet.image,
      currUser,
      0,
    ];

    tweet.repostCount = tweet.repostCount !== null ? tweet.repostCount + 1 : 1;

    await tweet.save();

    newTweet.createdAt = new Date().toString();

    newTweet.repostCount = 0;

    newTweet.userId = userId;

    newTweet.isRepost = true;

    await newTweet.user.save();

    await newTweet.save();

    return true;
  }

  @Mutation(() => Boolean)
  async deleteTweet(@Arg("tweetId") id: number, @Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["access-token"] === undefined) return null;

    const token: tokenResponse = verify(
      ctx.req.cookies["access-token"],
      process.env.JWT_SECRET as string
    ) as tokenResponse;

    const tweet = await Tweet.findOne({
      where: { id: id },
      relations: ["user", "replies"],
    });

    if (tweet === null) return false;

    if (token.user_Id !== tweet.user.id) {
      return false;
    }

    if (tweet.replies !== undefined) {
      for (let i = 0; i < tweet.replies.length; i++) {
        await Reply.delete({ id: tweet.replies[i].id });
      }
    }
    await Tweet.delete({ id: tweet.id });

    return true;
  }

  @Query(() => [Tweet])
  async getTopTweets(@Arg("limit") limit: number, @Ctx() ctx: MyCtx){
    if(ctx.req.cookies["access-token"] === undefined) return [];

    if(limit < 0) return [];

    const tweets = await Tweet.find({
      order: {
        likes: {
          direction: "DESC",
        },
      },
      take: limit,
      relations: ["user"]
    });

    return tweets;
  }
}

export { TweetResolver };
