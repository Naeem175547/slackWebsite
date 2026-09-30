export declare class User {
    username: string;
    email: string;
    id: number;
    name: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
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
