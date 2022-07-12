import { User } from "./../User/User";
import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Reply } from "../Reply/Reply";

@Entity()
@ObjectType()
class Tweet extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;
    
    @Column()
    @Field(() => String)
    description: string;
    
    @Column({nullable: true})
    @Field(() => String, {nullable: true})
    image: string;
    
    @Column()
    @Field(() => Int, {defaultValue: 0})
    likes: number;
    
    @Column()
    @Field(() => Boolean)
    isRepost: boolean;

    @Column({nullable: true})
    userId: number;
    
    @OneToMany(() => Reply, (reply) => reply.tweet, { nullable: true })
    @Field(() => [Reply], {nullable: true})
    replies: Reply[];
    
    @ManyToOne(() => User, (user) => user.tweets, { nullable: true })
    @Field(() => User, {nullable: true})
    user: User;
}

export { Tweet };

// SCHEMA
// Description --String
// Image / Video --String
// Replies - Custom Entity
// Likes --Int
// isRepost --Boolean
// UserRef -- type User