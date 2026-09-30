import { User } from '../../user/types/user.type.js';
export declare class Message {
    id: number;
    body: string;
    image?: string;
    user?: User;
    createdAt: Date;
    updatedAt: Date;
}
export declare class MessageResponse {
    success: boolean;
    message: string;
    data: Message[];
}
