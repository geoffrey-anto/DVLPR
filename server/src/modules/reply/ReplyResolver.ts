import { Reply } from "../../entity/Reply/Reply";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyCtx, tokenResponse } from "typings";
import { Tweet } from "../../entity/Tweet/Tweet";
import { verify } from "jsonwebtoken";

@Resolver(Reply)
class ReplyResolver {
  @Query(() => [Reply])
  async getReplies(@Arg("tweetId") id: number, @Ctx() ctx: MyCtx) {
    if (ctx.req.cookies["refresh-token"] === undefined) return null;

    const tweet = await Tweet.find({ where: { id }, relations: ["replies"] });

    if (tweet.length === 0) return [];

    const replies = tweet[0].replies;

    if (replies.length === 0) return [];

    return replies;
  }

  @Mutation(() => Boolean)
  async addReplyForTweet(
    @Arg("tweetId") tweetId: number,
    @Arg("description") description: string,
    @Ctx() ctx: MyCtx
  ) {
    if (ctx.req.cookies["refresh-token"] === undefined) return false;

    const tweet = await Tweet.findOne({
      where: {
        id: tweetId,
      },
      relations: ["replies"]
    });

    if(tweet === null) return false;

    const reply = new Reply();

    const token: tokenResponse = verify(
      ctx.req.cookies["refresh-token"],
      process.env.JWT_SECRET as string
    ) as tokenResponse;

    const userName = token.user_UserName;

    reply.repliedUsername = userName;
    reply.description = description;
    reply.likes = 1;
    reply.tweet = tweet;

    tweet.replyCount = !tweet.replyCount ? 0 : tweet.replyCount;

    await reply.tweet.save()
    
    await reply.save();

    return true;
  }
}

export { ReplyResolver };
