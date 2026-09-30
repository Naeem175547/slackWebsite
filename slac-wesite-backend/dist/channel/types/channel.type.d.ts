import { Message } from '../../message/types/message.type.js';
import { Workspace } from '../../workspace/dto/workspace.type.js';
export declare class Channel {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class FullChannel {
    id: number;
    name: string;
    createdAt: Date;
    messages: Message[];
    workspace: Workspace;
    updatedAt: Date;
}
export declare class ChannelResponse {
    success: number;
    message: string;
    data?: Channel;
}
export declare class FullChannelResponse {
    success: number;
    message: string;
    data?: FullChannel;
}
