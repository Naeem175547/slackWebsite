import { Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity.js';
export declare class MessageRepository {
    private readonly messageRepository;
    constructor(messageRepository: Repository<MessageEntity>);
    create(data: Partial<MessageEntity>): Promise<MessageEntity>;
    findAll(): Promise<MessageEntity[]>;
    findOne(id: number): Promise<MessageEntity | null>;
    findOneWithRelations(id: number): Promise<MessageEntity | null>;
    getPaginatedMessage(messageParams: any, page: number, limit: number): Promise<MessageEntity[]>;
    findByChannel(channelId: number): Promise<MessageEntity[]>;
    findByWorkspace(workspaceId: number): Promise<MessageEntity[]>;
    findByUser(userId: number): Promise<MessageEntity[]>;
    update(id: number, data: Partial<MessageEntity>): Promise<MessageEntity | null>;
    remove(id: number): Promise<MessageEntity | null>;
    count(): Promise<number>;
    exists(id: number): Promise<boolean>;
}
