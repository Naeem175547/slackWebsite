import { MessageRepository } from './message.repository.js';
import { MessageInput, MessageParams } from './dto/input.js';
import { ChannelRepository } from '../channel/channel.repository.js';
import { ChannelService } from '../channel/channel.service.js';
import { UserService } from '../user/user.service.js';
export declare class MessageService {
    private readonly messageRepository;
    private readonly channelRepository;
    private readonly channelService;
    private readonly userService;
    constructor(messageRepository: MessageRepository, channelRepository: ChannelRepository, channelService: ChannelService, userService: UserService);
    getPaginatedMessageSerive(messageParams: MessageParams, page: number, limit: number, userId: number): Promise<import("./entity/message.entity.js").MessageEntity[]>;
    createMessageService(data: MessageInput, userId: number): Promise<import("./entity/message.entity.js").MessageEntity>;
}
