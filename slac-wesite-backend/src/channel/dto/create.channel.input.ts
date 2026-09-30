import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput {
  name: string;
  workspaceId: number;
}
