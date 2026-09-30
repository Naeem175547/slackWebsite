import { CreateUserInput } from '../user/dto/create-user.input.js';
import { UserService } from '../user/user.service.js';
import { AuthService } from './auth.service.js';
export declare class AuthResolver {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    signUp(createUserInput: CreateUserInput): Promise<import("../user/entities/user.entity.js").UserEntity>;
    signIn(email: string, password: string): Promise<{
        user: import("../user/entities/user.entity.js").UserEntity;
        accessToken: string;
    }>;
}
