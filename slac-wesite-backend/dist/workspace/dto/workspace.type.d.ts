import { Message } from '../../message/types/message.type.js';
import { Channel } from '../../channel/types/channel.type.js';
import { WorkspaceMember } from './workspace.member.type.js';
export declare class Workspace {
    id: number;
    name: string;
    description?: string;
    joinCode?: string;
    channels?: Channel[];
    messages?: Message[];
    members?: WorkspaceMember[];
}
export declare class WorkspaceResponse {
    success: boolean;
    message: string;
    data?: Workspace;
}
export declare class WorkspacesResponse {
    success: boolean;
    message: string;
    data?: Workspace[];
}
