import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { vi } from 'vitest';

import { UserEntity } from './entities/user.entity.js';
import { UserService } from './user.service.js';

describe('UserService', () => {
  let service: UserService;
  let repository: {
    find: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      find: vi.fn(),
      findOne: vi.fn(),
      save: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should create a user and return the wrapped GraphQL response shape', async () => {
    const input = {
      email: 'test@example.com',
      username: 'alice',
      password: 'secret123',
    };

    const savedUser = {
      id: 1,
      ...input,
      password: 'hashed-password',
      avatar: 'https://robohash.org/alice',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repository.save.mockResolvedValue(savedUser);

    const result = await service.create(input);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: true,
      message: 'User created successfully',
      data: savedUser,
    });
  });

  it('should find a user by id and return the wrapped GraphQL response shape', async () => {
    const foundUser = {
      id: 7,
      email: 'user@example.com',
      username: 'bob',
      password: 'hashed-password',
      avatar: 'https://robohash.org/bob',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repository.findOne.mockResolvedValue(foundUser);

    const result = await service.findOne(7);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 7 } });
    expect(result).toEqual({
      success: true,
      message: 'User found',
      data: foundUser,
    });
  });
});
