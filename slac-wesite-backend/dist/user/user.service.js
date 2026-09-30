var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ConflictException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity.js';
import { GraphQLError } from 'graphql/error/GraphQLError.js';
import * as bcrypt from 'bcrypt';
let UserService = class UserService {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(createUserInput) {
        try {
            const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
            const user = this.userRepo.create({
                ...createUserInput,
                password: hashedPassword,
            });
            const result = await this.userRepo.save(user);
            return result;
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new GraphQLError('Email or username already exists', {
                    extensions: {
                        code: 'CONFLICT',
                        statuscode: 409,
                    },
                });
            }
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async findAll() {
        return await this.userRepo.find();
    }
    async findOne(id) {
        const user = await this.userRepo.findOne({
            where: { id },
        });
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'NOT_FOUND',
                    statuscode: 404,
                },
            });
        }
        return user;
    }
    async findOneByEmail(email) {
        const user = await this.userRepo.findOne({
            where: { email },
        });
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'NOT_FOUND',
                    statuscode: 404,
                },
            });
        }
        return user;
    }
    async findOneByUsername(username) {
        const user = await this.userRepo.findOne({
            where: { username },
        });
        if (!user) {
            throw new GraphQLError('User not found', {
                extensions: {
                    code: 'NOT_FOUND',
                    statuscode: 404,
                },
            });
        }
        return user;
    }
    async update(id, updateUserInput) {
        try {
            const user = await this.userRepo.findOne({
                where: { id },
            });
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                        statuscode: 404,
                    },
                });
            }
            await this.userRepo.update({ id }, updateUserInput);
            const result = await this.userRepo.findOne({
                where: { id },
            });
            return result;
        }
        catch (error) {
            if (error instanceof ConflictException)
                throw new GraphQLError('Email or username already exists', {
                    extensions: {
                        code: 'CONFLICT',
                        statuscode: 409,
                    },
                });
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this.userRepo.findOne({
                where: { id },
            });
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'NOT_FOUND',
                        statuscode: 404,
                    },
                });
            }
            await this.userRepo.delete({ id });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    Injectable(),
    __param(0, InjectRepository(UserEntity)),
    __metadata("design:paramtypes", [Repository])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map