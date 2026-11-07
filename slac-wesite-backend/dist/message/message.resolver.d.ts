import { MessageService } from './message.service.js';
import { MessageParams } from './dto/input.js';
import { AwsService } from '../aws/aws.service.js';
export declare class MessageResolver {
    private readonly messageService;
    private readonly awsService;
    constructor(messageService: MessageService, awsService: AwsService);
    getPresignedUrl(): Promise<string>;
    getPaginatedMessage(context: any, messageParams: MessageParams, page: number | null, limit: number | null): Promise<import("./entity/message.entity.js").MessageEntity[]>;
}
