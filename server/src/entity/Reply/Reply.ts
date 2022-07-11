import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tweet } from "../Tweet/Tweet";

@ObjectType()
@Entity()
class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column(() => String)
  @Field(() => String)
  description: string;

  @Column(() => String)
  @Field(() => String)
  likes: string;

  @ManyToOne(() => Tweet, (tweet) => tweet.replies, { nullable: true })
  @Field(() => [Tweet], {nullable: true})
  tweet: Tweet;
}

export { Reply };
// Schema
// UserRef --type User
// Description --String
// Likes --Int
