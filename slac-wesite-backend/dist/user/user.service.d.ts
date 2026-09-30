import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import { UserEntity } from './entities/user.entity.js';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<UserEntity>);
    create(createUserInput: CreateUserInput): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity>;
    findOneByUsername(username: string): Promise<UserEntity>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<UserEntity | null>;
    remove(id: number): Promise<UserEntity>;
}
