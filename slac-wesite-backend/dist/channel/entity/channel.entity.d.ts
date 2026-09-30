import { MessageEntity } from "../../message/entity/message.entity.js";
import type { Relation } from "typeorm";
import { WorkspaceEntity } from "../../workspace/entity/workspace.entity.js";
export declare class ChannelEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Relation<MessageEntity[]>;
    workspace: Relation<WorkspaceEntity>;
}
