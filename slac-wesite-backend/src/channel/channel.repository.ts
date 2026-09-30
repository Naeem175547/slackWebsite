import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './entity/channel.entity.js';
import { CreateChannelInput } from './dto/update.channel.input.js';
import { Repository } from 'typeorm/repository/Repository.js';

@Injectable()
export class ChannelRepository {
  // Define your repository methods here
  constructor(
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
  ) {}
  async createChannel(channelData: CreateChannelInput): Promise<any> {
    const channel = this.channelRepository.create(channelData);
    await this.channelRepository.save(channel);
    return channel;
  }

  async getAllChannels(): Promise<any[]> {
    return await this.channelRepository.find();
  }

  async getChannelById(channelId: number): Promise<any> {
    return await this.channelRepository.findOne({ where: { id: channelId } });
  }

  async updateChannel(channelId: number, updateData: any): Promise<any> {
    return await this.channelRepository.update(channelId, updateData);
  }

  async deleteChannel(channelId: number): Promise<void> {
    await this.channelRepository.delete(channelId);
  }

  async getChannelWithAllDetails(channelId: number) {
    return await this.channelRepository.findOne({
      where: {
        id: channelId,
      },
      relations: {
        workspace: {
          members: {
            user: true,
          },
        },
        messages: true,
      },
    });
  }
}
