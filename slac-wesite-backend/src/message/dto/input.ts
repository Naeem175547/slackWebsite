import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class MessageParams {
  @Field(() => Int)
  channelId?: number;

  @Field(() => Int, { nullable: true })
  workspaceId?: number;

  @Field(() => Int, { nullable: true })
  userId?: number;
}

@InputType()
export class MessageInput {
  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Int)
  channelId: number;
}
