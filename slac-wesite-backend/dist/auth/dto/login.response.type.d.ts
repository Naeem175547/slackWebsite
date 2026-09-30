import { User } from '../../user/types/user.type.js';
export declare class LoginData {
    user: User;
    accessToken: string;
}
export declare class LoginResponse {
    success: boolean;
    message: string;
    data?: LoginData;
}
