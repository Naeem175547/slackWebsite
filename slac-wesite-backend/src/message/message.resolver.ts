import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';

import { MessageService } from './message.service.js';
import { MessageResponse } from './types/message.type.js';
import { MessageParams } from './dto/input.js';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageResponse)
  async getPaginatedMessage(
    @Context() context: any,
    @Args('messageParams', { type: () => MessageParams })
    messageParams: MessageParams,

    @Args('page', { type: () => Int, nullable: true })
    page: number | null,

    @Args('limit', { type: () => Int, nullable: true })
    limit: number | null,
  ) {
    return await this.messageService.getPaginatedMessageSerive(
      messageParams,
      page || 1,
      limit || 20,
      context.req.user.id,
    );
  }
}
