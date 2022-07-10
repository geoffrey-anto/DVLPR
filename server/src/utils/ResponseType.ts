import { ClassType, Field, ObjectType } from "type-graphql";

export default function queryResponse<T>(TItemClass: ClassType<T>){
    @ObjectType({isAbstract: true})
    abstract class queryResponseGQL{
        @Field(() => String, {nullable: true})
        error: string;

        @Field(() => TItemClass, {nullable: true})
        data: T
    }
    return queryResponseGQL
}