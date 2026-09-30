import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GraphQLError } from 'graphql';

import { WorkspaceEntity } from './entity/workspace.entity.js';
import { CreateWorkspaceInput } from './dto/create.workspace.input.js';
import { UserService } from '../user/user.service.js';
import { WorkspaceMemberEntity } from './entity/workspace-member.entity.js';
import { ChannelEntity } from '../channel/entity/channel.entity.js';

@Injectable()
export class WorkRepository {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private workSpaceRepo: Repository<WorkspaceEntity>,
    private userService: UserService,
    @InjectRepository(WorkspaceMemberEntity)
    private workspaceMemberRepository: Repository<WorkspaceMemberEntity>,
    @InjectRepository(ChannelEntity)
    private channelRepository: Repository<ChannelEntity>,
  ) {}

  // CREATE
  async create(
    createWorkspaceDto: CreateWorkspaceInput & { joinCode: string },
  ): Promise<WorkspaceEntity> {
    const workspace = this.workSpaceRepo.create(createWorkspaceDto);
    return await this.workSpaceRepo.save(workspace);
  }

  // FIND ALL
  async findAll(): Promise<WorkspaceEntity[]> {
    try {
      return await this.workSpaceRepo.find();
    } catch {
      throw new GraphQLError('Failed to fetch workspaces', {
        extensions: {
          code: 'WORKSPACE_FETCH_FAILED',
          httpStatus: 500,
        },
      });
    }
  }

  // FIND BY ID
  async findById(id: number): Promise<WorkspaceEntity | null> {
    return await this.workSpaceRepo.findOne({
      where: {
        id,
      },
      relations: {
        members: {
          user: true,
        },
        messages: true,
        channels: true,
      },
    });
  }

  async getWorkspaceDetailsById(workspaceId: number) {
    return await this.workSpaceRepo.findOne({
      where: { id: workspaceId },
      relations: {
        members: {
          user: true,
        },
        channels: true,
        messages: true,
      },
    });
  }

  // UPDATE
  // UPDATE
  async update(
    id: number,
    updateWorkspaceDto: Partial<CreateWorkspaceInput>,
  ): Promise<WorkspaceEntity> {
    const workspace = await this.workSpaceRepo.findOne({
      where: { id },
    });
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    Object.assign(workspace, updateWorkspaceDto);
    return await this.workSpaceRepo.save(workspace); // save to DB
  }

  // DELETE
  async delete(id: number): Promise<void> {
    await this.workSpaceRepo.delete(id);
  }
  async deleteMany(ids: number[]) {
    const response = await this.workSpaceRepo.delete({
      id: In(ids),
    });
    return response.affected !== 0;
  }

  // FIND BY NAME
  async findByName(name: string): Promise<WorkspaceEntity> {
    try {
      const workspace = await this.workSpaceRepo.findOne({
        where: { name },
      });

      if (!workspace) {
        throw new GraphQLError('Workspace not found', {
          extensions: {
            code: 'WORKSPACE_NOT_FOUND',
            httpStatus: 404,
          },
        });
      }

      return workspace;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError('Failed to fetch workspace', {
        extensions: {
          code: 'WORKSPACE_FETCH_FAILED',
          httpStatus: 500,
        },
      });
    }
  }

  // FIND BY JOIN CODE
  async findByJoinCode(joinCode: string): Promise<WorkspaceEntity | null> {
    return await this.workSpaceRepo.findOne({
      where: {
        joinCode: joinCode.toUpperCase(),
      },
      relations: {
        channels: true,
        members: {
          user: true,
        },
        messages: true,
      },
    });
  }

  async addMemberToWorkspace(
    workspaceId: number,
    userId: number,
    role: 'admin' | 'member',
  ): Promise<WorkspaceMemberEntity> {
    try {
      const workspace = await this.workSpaceRepo.findOne({
        where: { id: workspaceId },
      });
      if (!workspace) {
        throw new GraphQLError('Workspace not found', {
          extensions: {
            code: 'WORKSPACE_NOT_FOUND',
            httpStatus: 404,
          },
        });
      }

      const member = await this.userService.findOne(userId);
      if (!member) {
        throw new GraphQLError('User not found', {
          extensions: {
            code: 'USER_NOT_FOUND',
            httpStatus: 404,
          },
        });
      }

      const existingMember = await this.workspaceMemberRepository.findOne({
        where: {
          workspace: { id: workspaceId },
          user: { id: userId },
        },
      });

      if (existingMember) {
        throw new GraphQLError('User is already a member of this workspace', {
          extensions: {
            code: 'ALREADY_WORKSPACE_MEMBER',
            httpStatus: 400,
          },
        });
      }

      const workspaceMember = this.workspaceMemberRepository.create({
        workspace: workspace,
        user: member,
        role,
      });
      return await this.workspaceMemberRepository.save(workspaceMember);
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError('Failed to add member to workspace', {
        extensions: {
          code: 'ADD_MEMBER_FAILED',
          httpStatus: 500,
        },
      });
    }
  }

  async addChannelToWorkspace(
    workspaceId: number,
    channelName: string,
  ): Promise<WorkspaceEntity> {
    try {
      // 1. Find workspace
      const workspace = await this.workSpaceRepo.findOne({
        where: { id: workspaceId },
      });

      if (!workspace) {
        throw new GraphQLError('Workspace not found', {
          extensions: {
            code: 'WORKSPACE_NOT_FOUND',
            httpStatus: 404,
          },
        });
      }

      // 2. Check whether channel already exists in this workspace
      const existingChannel = await this.channelRepository.findOne({
        where: {
          name: channelName,
          workspace: {
            id: workspaceId,
          },
        },
      });

      if (existingChannel) {
        throw new GraphQLError('Channel already part of workspace', {
          extensions: {
            code: 'CHANNEL_ALREADY_EXISTS',
            httpStatus: 400,
          },
        });
      }

      // 3. Create channel and directly associate it with workspace
      const channel = this.channelRepository.create({
        name: channelName,
        workspace: workspace,
      });

      // 4. Save channel
      await this.channelRepository.save(channel);

      // 5. Return updated workspace
      return (await this.workSpaceRepo.findOne({
        where: { id: workspaceId },
        relations: {
          channels: true,
        },
      })) as WorkspaceEntity;
    } catch (error) {
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError('Failed to add channel to workspace', {
        extensions: {
          code: 'ADD_CHANNEL_FAILED',
          httpStatus: 500,
        },
      });
    }
  }

  async fetchAllWorkspacesByMemberId(
    memberId: number, //userId
  ): Promise<WorkspaceEntity[]> {
    // Implementation for fetching all workspaces by member ID
    try {
      const workspaces = await this.workSpaceRepo
        .createQueryBuilder('workspace')
        .innerJoinAndSelect('workspace.members', 'member')
        .where('member.user_id = :memberId', { memberId })
        .getMany();

      return workspaces;
    } catch (error) {
      throw new GraphQLError('Failed to fetch workspaces for member', {
        extensions: {
          code: 'WORKSPACE_FETCH_FAILED',
          httpStatus: 500,
        },
      });
    }
  }
}
