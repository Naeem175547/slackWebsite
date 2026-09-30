import { MessageService } from './message.service.js';
import { MessageParams } from './dto/input.js';
export declare class MessageResolver {
    private readonly messageService;
    constructor(messageService: MessageService);
    getPaginatedMessage(context: any, messageParams: MessageParams, page: number | null, limit: number | null): Promise<import("./entity/message.entity.js").MessageEntity[]>;
}
