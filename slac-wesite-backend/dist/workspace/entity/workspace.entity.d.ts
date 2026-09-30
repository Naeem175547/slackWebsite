import type { Relation } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceMemberEntity } from './workspace-member.entity.js';
export declare class WorkspaceEntity {
    id: number;
    name: string;
    description: string;
    joinCode: string;
    messages: Relation<MessageEntity[]>;
    channels: Relation<ChannelEntity[]>;
    members: Relation<WorkspaceMemberEntity[]>;
    createdAt: Date;
    updatedAt: Date;
}
