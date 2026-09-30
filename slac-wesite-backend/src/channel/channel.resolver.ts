import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { FullChannelResponse } from './types/channel.type.js';
import { ChannelService } from './channel.service.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuards } from '../common/guards/auth.guard.js';

@UseGuards(AuthGuards)
@Resolver()
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Query(() => FullChannelResponse)
  getChannelById(
    @Args('channelId') channelId: number,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;

    return this.channelService.getChannelByIdService(channelId, userId);
  }
}
