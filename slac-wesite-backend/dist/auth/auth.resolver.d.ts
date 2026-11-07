import { CreateUserInput } from '../user/dto/create-user.input.js';
import { UserService } from '../user/user.service.js';
import { AuthService } from './auth.service.js';
import { RabbitMqProducer } from '../rabbitmq/rabbitmq.producer.js';
export declare class AuthResolver {
    private readonly userService;
    private readonly authService;
    private readonly rabbitmqProducer;
    constructor(userService: UserService, authService: AuthService, rabbitmqProducer: RabbitMqProducer);
    signUp(createUserInput: CreateUserInput): Promise<import("../user/entities/user.entity.js").UserEntity>;
    verifyToken(token: string): Promise<void>;
    signIn(email: string, password: string): Promise<{
        user: import("../user/entities/user.entity.js").UserEntity;
        accessToken: string;
    }>;
}
