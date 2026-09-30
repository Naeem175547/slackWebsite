import { Field, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../../user/types/user.type.js';


@ObjectType()
export class LoginData {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => LoginData, { nullable: true })
  data?: LoginData;
}