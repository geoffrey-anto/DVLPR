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

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  description: string;

  @Column()
  @Field(() => Int)
  likes: number;

  @ManyToOne(() => Tweet, (tweet) => tweet.replies, { nullable: true })
  @Field(() => [Tweet], {nullable: true})
  tweet: Tweet;
}

export { Reply };
// Schema
// UserRef --type User
// Description --String
// Likes --Int
