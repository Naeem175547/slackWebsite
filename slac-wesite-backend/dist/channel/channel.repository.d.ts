import { ChannelEntity } from './entity/channel.entity.js';
import { CreateChannelInput } from './dto/update.channel.input.js';
import { Repository } from 'typeorm/repository/Repository.js';
export declare class ChannelRepository {
    private channelRepository;
    constructor(channelRepository: Repository<ChannelEntity>);
    createChannel(channelData: CreateChannelInput): Promise<any>;
    getAllChannels(): Promise<any[]>;
    getChannelById(channelId: number): Promise<any>;
    updateChannel(channelId: number, updateData: any): Promise<any>;
    deleteChannel(channelId: number): Promise<void>;
    getChannelWithAllDetails(channelId: number): Promise<ChannelEntity | null>;
}
