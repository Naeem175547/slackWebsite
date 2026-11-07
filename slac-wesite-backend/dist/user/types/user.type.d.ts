export declare class User {
    username: string;
    email: string;
    id: number;
    name: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    isVarified: boolean;
    token: string;
    tokenExpiryDate: Date;
}
export declare class UsersResponse {
    success: boolean;
    message: string;
    data?: User[];
}
export declare class UserResponse {
    success: boolean;
    message: string;
    data?: User;
}
