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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { WorkspaceEntity } from './entity/workspace.entity.js';
import { UserService } from '../user/user.service.js';
import { WorkspaceMemberEntity } from './entity/workspace-member.entity.js';
import { ChannelEntity } from '../channel/entity/channel.entity.js';
let WorkRepository = class WorkRepository {
    workSpaceRepo;
    userService;
    workspaceMemberRepository;
    channelRepository;
    constructor(workSpaceRepo, userService, workspaceMemberRepository, channelRepository) {
        this.workSpaceRepo = workSpaceRepo;
        this.userService = userService;
        this.workspaceMemberRepository = workspaceMemberRepository;
        this.channelRepository = channelRepository;
    }
    async create(createWorkspaceDto) {
        const workspace = this.workSpaceRepo.create(createWorkspaceDto);
        return await this.workSpaceRepo.save(workspace);
    }
    async findAll() {
        try {
            return await this.workSpaceRepo.find();
        }
        catch {
            throw new GraphQLError('Failed to fetch workspaces', {
                extensions: {
                    code: 'WORKSPACE_FETCH_FAILED',
                    httpStatus: 500,
                },
            });
        }
    }
    async findById(id) {
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
    async getWorkspaceDetailsById(workspaceId) {
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
    async update(id, updateWorkspaceDto) {
        const workspace = await this.workSpaceRepo.findOne({
            where: { id },
        });
        if (!workspace) {
            throw new Error('Workspace not found');
        }
        Object.assign(workspace, updateWorkspaceDto);
        return await this.workSpaceRepo.save(workspace);
    }
    async delete(id) {
        await this.workSpaceRepo.delete(id);
    }
    async deleteMany(ids) {
        const response = await this.workSpaceRepo.delete({
            id: In(ids),
        });
        return response.affected !== 0;
    }
    async findByName(name) {
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
        }
        catch (error) {
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
    async findByJoinCode(joinCode) {
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
    async addMemberToWorkspace(workspaceId, userId, role) {
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
        }
        catch (error) {
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
    async addChannelToWorkspace(workspaceId, channelName) {
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
            const channel = this.channelRepository.create({
                name: channelName,
                workspace: workspace,
            });
            await this.channelRepository.save(channel);
            return (await this.workSpaceRepo.findOne({
                where: { id: workspaceId },
                relations: {
                    channels: true,
                },
            }));
        }
        catch (error) {
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
    async fetchAllWorkspacesByMemberId(memberId) {
        try {
            const workspaces = await this.workSpaceRepo
                .createQueryBuilder('workspace')
                .innerJoinAndSelect('workspace.members', 'member')
                .where('member.user_id = :memberId', { memberId })
                .getMany();
            return workspaces;
        }
        catch (error) {
            throw new GraphQLError('Failed to fetch workspaces for member', {
                extensions: {
                    code: 'WORKSPACE_FETCH_FAILED',
                    httpStatus: 500,
                },
            });
        }
    }
};
WorkRepository = __decorate([
    Injectable(),
    __param(0, InjectRepository(WorkspaceEntity)),
    __param(2, InjectRepository(WorkspaceMemberEntity)),
    __param(3, InjectRepository(ChannelEntity)),
    __metadata("design:paramtypes", [Repository,
        UserService,
        Repository,
        Repository])
], WorkRepository);
export { WorkRepository };
//# sourceMappingURL=workspace.repository.js.map