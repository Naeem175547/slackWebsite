import { ChannelService } from './channel.service.js';
export declare class ChannelResolver {
    private readonly channelService;
    constructor(channelService: ChannelService);
    getChannelById(channelId: number, context: any): Promise<import("./entity/channel.entity.js").ChannelEntity>;
}
