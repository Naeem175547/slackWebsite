import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/types/user.type.js';

@ObjectType()
export class Message {
  @Field()
  id: number;

  @Field()
  body: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class MessageResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [Message])
  data: Message[];
}
