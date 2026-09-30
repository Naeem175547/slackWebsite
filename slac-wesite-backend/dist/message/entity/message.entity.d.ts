import type { Relation } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceEntity } from '../../workspace/entity/workspace.entity.js';
export declare class MessageEntity {
    id: number;
    body: string;
    image: string;
    user: Relation<UserEntity>;
    channel: Relation<ChannelEntity>;
    workspace: Relation<WorkspaceEntity>;
    createdAt: Date;
    updatedAt: Date;
}
