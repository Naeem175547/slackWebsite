import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class UsersResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [User], { nullable: true })
  data?: User[];
}

@ObjectType()
export class UserResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  data?: User;
}
