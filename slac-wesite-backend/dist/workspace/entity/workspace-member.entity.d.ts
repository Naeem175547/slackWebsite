import type { Relation } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity.js';
import { WorkspaceEntity } from '../entity/workspace.entity.js';
export declare class WorkspaceMemberEntity {
    id: number;
    user: Relation<UserEntity>;
    workspace: Relation<WorkspaceEntity>;
    role: 'admin' | 'member';
    createdAt: Date;
    updatedAt: Date;
}
