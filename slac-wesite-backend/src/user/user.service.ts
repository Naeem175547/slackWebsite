import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';
import { UserEntity } from './entities/user.entity.js';
import { GraphQLError } from 'graphql/error/GraphQLError.js';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  // CREATE
  async create(createUserInput: CreateUserInput) {
    try {      
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      const user = this.userRepo.create({
        ...createUserInput,
        password: hashedPassword,
      });
      const result = await this.userRepo.save(user);
      return result;
    } catch (error: any) {      
      if (error.code === 'ER_DUP_ENTRY') {
        // throw new ConflictException('Email or username already exists');
        throw new GraphQLError('Email or username already exists',{
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

  async findOne(id: number) {
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
  async findOneByEmail(email: string) {
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

  async findOneByUsername(username: string) {
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

  async update(id: number, updateUserInput: UpdateUserInput) {
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

      // if (updateUserInput.email) {
      //   const existingEmail = await this.userRepo.findOne({
      //     where: {
      //       email: updateUserInput.email,
      //     },
      //   });

      //   if (existingEmail && existingEmail.id !== id) {
      //     throw new ConflictException('Email already exists');
      //   }
      // }

      await this.userRepo.update({ id }, updateUserInput);

      const result = await this.userRepo.findOne({
        where: { id },
      });

      return result;
    } catch (error) {
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

  async remove(id: number) {
    try{
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
}
