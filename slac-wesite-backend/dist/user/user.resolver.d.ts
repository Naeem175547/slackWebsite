import { UserService } from './user.service.js';
import { UpdateUserInput } from './dto/update-user.input.js';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity.js").UserEntity[]>;
    findOne(id: number): Promise<import("./entities/user.entity.js").UserEntity>;
    findOneByEmail(email: string): Promise<import("./entities/user.entity.js").UserEntity>;
    findOneByUsername(username: string): Promise<import("./entities/user.entity.js").UserEntity>;
    updateUser(id: number, updateUserInput: UpdateUserInput): Promise<import("./entities/user.entity.js").UserEntity | null>;
    removeUser(id: number): Promise<import("./entities/user.entity.js").UserEntity>;
}
