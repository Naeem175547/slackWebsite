import { ChannelRepository } from './channel.repository.js';
export declare class ChannelService {
    private readonly channelRepository;
    constructor(channelRepository: ChannelRepository);
    getChannelByIdService(channelId: number, userId: number): Promise<import("./entity/channel.entity.js").ChannelEntity>;
}
