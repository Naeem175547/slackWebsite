import type { Relation } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity.js';
import { WorkspaceMemberEntity } from '../../workspace/entity/workspace-member.entity.js';
export declare class UserEntity {
    id: number;
    email: string;
    name: string;
    password: string;
    username: string;
    avatar: string;
    messages: MessageEntity[];
    workspaceMembers: Relation<WorkspaceMemberEntity>[];
    createdAt: Date;
    updatedAt: Date;
    generateAvatar(): void;
}
