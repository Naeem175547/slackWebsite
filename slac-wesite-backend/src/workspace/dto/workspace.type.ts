import { Field, ObjectType } from '@nestjs/graphql';

import { Message } from '../../message/types/message.type.js';
import { Channel } from '../../channel/types/channel.type.js';
import { WorkspaceMember } from './workspace.member.type.js';

@ObjectType()
export class Workspace {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  joinCode?: string;

  @Field(() => [Channel], { nullable: true })
  channels?: Channel[];

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field(() => [WorkspaceMember], { nullable: true })
  members?: WorkspaceMember[];
}

@ObjectType()
export class WorkspaceResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Workspace, { nullable: true })
  data?: Workspace;
}

@ObjectType()
export class WorkspacesResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [Workspace], { nullable: true })
  data?: Workspace[];
}
