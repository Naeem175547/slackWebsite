import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ChannelRepository } from './channel.repository.js';
import { isUserMemberOfWorkspace } from '../helper/isUserMemberOfWorkspace.js';

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  async getChannelByIdService(channelId: number, userId: number) {
    try {
      const channel =
        await this.channelRepository.getChannelWithAllDetails(channelId);

      if (!channel || !channel.workspace) {
        throw new NotFoundException('Channel not found with the provided ID');
      }

      const isUserPartOfWorkspace = isUserMemberOfWorkspace(
        channel.workspace,
        userId,
      );

      console.log(channel);
      console.log(channel.workspace.members);

      if (!isUserPartOfWorkspace) {
        throw new UnauthorizedException(
          'User is not a member of the workspace and hence cannot access the channel',
        );
      }

      return channel;
    } catch (error) {
      console.log('Get channel by ID service error', error);
      throw error;
    }
  }
}
