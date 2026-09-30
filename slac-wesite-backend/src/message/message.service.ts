import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { MessageRepository } from './message.repository.js';
import { MessageInput, MessageParams } from './dto/input.js';
import { ChannelRepository } from '../channel/channel.repository.js';
import { isUserMemberOfWorkspace } from '../helper/isUserMemberOfWorkspace.js';
import { Context } from '@nestjs/graphql';
import { ChannelService } from '../channel/channel.service.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly channelRepository: ChannelRepository,
    private readonly channelService: ChannelService,
    private readonly userService: UserService,
  ) {}

  async getPaginatedMessageSerive(
    messageParams: MessageParams,
    page: number,
    limit: number,
    userId: number,
  ) {
    try {
      const channelId = messageParams.channelId;
      if (!channelId) {
        throw new GraphQLError('Channel ID is required');
      }

      const channel =
        await this.channelRepository.getChannelWithAllDetails(channelId);

      if (!channel) {
        throw new GraphQLError('Channel not found');
      }

      const workspace = channel.workspace;
      const isMember = isUserMemberOfWorkspace(workspace, userId);

      if (!isMember) {
        throw new GraphQLError('user not the member of workspace');
      }

      return await this.messageRepository.getPaginatedMessage(
        messageParams,
        page,
        limit,
      );
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError('Failed to fetch messages');
    }
  }

  async createMessageService(data: MessageInput, userId: number) {
    const channelId = data.channelId;

    const channel = await this.channelService.getChannelByIdService(
      channelId,
      userId,
    );

    if (!channel) {
      throw new GraphQLError('Channel not found');
    }

    // 2. Get workspace from fetched channel
    const workspace = channel.workspace;

    if (!workspace) {
      throw new GraphQLError('Workspace not found');
    }

    // 3. Check user membership using fetched workspace
    const isMember = await isUserMemberOfWorkspace(workspace.id, userId);

    if (!isMember) {
      throw new GraphQLError('You are not a member of this workspace');
    }

    const user = await this.userService.findOne(userId);

    // 4. Save message using fetched relations
    const message = await this.messageRepository.create({
      body: data.body,
      image: data.image,
      channel: channel,
      workspace: workspace,
      user,
    });

    return message;
  }
}
