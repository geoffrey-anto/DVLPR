import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tweet } from "../Tweet/Tweet";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => String, {})
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user, { nullable: true })
  @Field(() => [Tweet], {nullable: true})
  tweets: Tweet[];
}
