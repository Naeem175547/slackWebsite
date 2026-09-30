import { Field, ObjectType } from '@nestjs/graphql';

import { Message } from '../../message/types/message.type.js';
import { Workspace } from '../../workspace/dto/workspace.type.js';

@ObjectType()
export class Channel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class FullChannel {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => Workspace)
  workspace: Workspace;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class ChannelResponse {
  @Field()
  success: number;

  @Field()
  message: string;

  @Field(() => Channel, { nullable: true })
  data?: Channel;
}

@ObjectType()
export class FullChannelResponse {
  @Field()
  success: number;

  @Field()
  message: string;

  @Field(() => FullChannel, { nullable: true })
  data?: FullChannel;
}
