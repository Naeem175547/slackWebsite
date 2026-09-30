import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateChannelInput implements Partial<CreateChannelInput> {}
