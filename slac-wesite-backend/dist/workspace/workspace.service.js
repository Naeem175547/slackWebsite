var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql/error/index.js';
import { WorkRepository } from './workspace.repository.js';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service.js';
import { RabbitMqProducer } from '../rabbitmq/rabbitmq.producer.js';
let WorkspaceService = class WorkspaceService {
    workspaceRepository;
    userService;
    rabbitmqproducer;
    constructor(workspaceRepository, userService, rabbitmqproducer) {
        this.workspaceRepository = workspaceRepository;
        this.userService = userService;
        this.rabbitmqproducer = rabbitmqproducer;
    }
    isUserAdminOfWorkspace(workspace, userId) {
        const member = workspace.members.find((member) => member.user.id === userId && member.role === 'admin');
        return !!member;
    }
    isUserMemberOfWorkspace(workspace, userId) {
        return workspace.members.some((member) => member.user.id === userId);
    }
    isChannelAlredyPartOfWorkSpace(worksapce, channelName) {
        return worksapce.channels.some((channel) => channel.name.toLocaleLowerCase() === channelName.toLocaleLowerCase());
    }
    async createWorkspaceService(createWorkspaceDto) {
        try {
            const joinCode = uuidv4().substring(0, 6).toUpperCase();
            const workspaceData = {
                ...createWorkspaceDto,
                joinCode,
            };
            const response = await this.workspaceRepository.create(workspaceData);
            await this.workspaceRepository.addMemberToWorkspace(response.id, createWorkspaceDto.ownerId, 'admin');
            await this.workspaceRepository.addChannelToWorkspace(response.id, 'general');
            console.log('SERVICE RESPONSE:', response);
            return response;
        }
        catch (error) {
            console.log('CREATE WORKSPACE ERROR:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                throw new GraphQLError('Workspace with the same name already exists', {
                    extensions: {
                        code: 'WORKSPACE_DUPLICATE',
                        httpStatus: 400,
                    },
                });
            }
            throw new GraphQLError('Failed to create workspace', {
                extensions: {
                    code: 'WORKSPACE_CREATION_FAILED',
                    httpStatus: 500,
                },
            });
        }
    }
    async deleteWorkspaceService(workspaceId, userId) {
        try {
            const workspace = await this.workspaceRepository.findById(workspaceId);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isAdmin = this.isUserAdminOfWorkspace(workspace, userId);
            if (!isAdmin) {
                throw new GraphQLError('User is not an admin of the workspace', {
                    extensions: {
                        code: 'USER_NOT_ADMIN',
                        httpStatus: 403,
                    },
                });
            }
            const deletedWorkspace = await this.workspaceRepository.delete(workspaceId);
            return workspace;
        }
        catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            }
            console.log('DELETE WORKSPACE ERROR:', error);
            throw new GraphQLError('Failed to delete workspace', {
                extensions: {
                    code: 'WORKSPACE_DELETION_FAILED',
                    httpStatus: 500,
                },
            });
        }
    }
    async getAllWorkspacesByMemberId(userId) {
        try {
            const resonse = await this.workspaceRepository.fetchAllWorkspacesByMemberId(userId);
            return resonse;
        }
        catch (error) {
            console.log('Get workspaces user is member of service error', error);
            throw error;
        }
    }
    async getWorksapceService(workspaceId, userId) {
        try {
            const workspace = await this.workspaceRepository.findById(workspaceId);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isMember = this.isUserMemberOfWorkspace(workspace, userId);
            if (!isMember) {
                throw new GraphQLError('user is not the member of worksapce', {
                    extensions: {
                        code: 'UNAUHORIZED',
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
    async getWorkspaceByJoinCodeService(joinCode, userId) {
        try {
            const workspace = await this.workspaceRepository.findByJoinCode(joinCode);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isMember = this.isUserMemberOfWorkspace(workspace, userId);
            if (!isMember) {
                throw new GraphQLError('user is not member of worksapce');
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
    async UpdateWorkspaceService(workspaceId, updateWorkspaceInput, userId) {
        try {
            let workspace = await this.workspaceRepository.findById(workspaceId);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isAdmin = this.isUserAdminOfWorkspace(workspace, userId);
            if (!isAdmin) {
                throw new GraphQLError('User is not an admin of the workspace', {
                    extensions: {
                        code: 'USER_NOT_ADMIN',
                        httpStatus: 403,
                    },
                });
            }
            console.log('UPDATE INPUT:', updateWorkspaceInput);
            workspace = await this.workspaceRepository.update(workspaceId, updateWorkspaceInput);
            console.log(workspace);
            return workspace;
        }
        catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            }
            if (error.code === 'ER_DUP_ENTRY') {
                throw new GraphQLError('Workspace with this name already exists', {
                    extensions: {
                        code: 'DUPLICATE_WORKSPACE_NAME',
                        httpStatus: 400,
                    },
                });
            }
            throw new GraphQLError('Failed to update workspace', {
                extensions: {
                    code: 'WORKSPACE_UPDATE_FAILED',
                    httpStatus: 500,
                },
            });
        }
    }
    async addMemberToWorkspaceService(workspaceId, memberId, userId) {
        try {
            const workspace = await this.workspaceRepository.findById(workspaceId);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isAdmin = this.isUserAdminOfWorkspace(workspace, userId);
            if (!isAdmin) {
                throw new GraphQLError('User is not an admin of the workspace', {
                    extensions: {
                        code: 'USER_NOT_ADMIN',
                        httpStatus: 403,
                    },
                });
            }
            const member = await this.userService.findOne(memberId);
            if (!member) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'USER_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isMember = this.isUserMemberOfWorkspace(workspace, memberId);
            if (isMember) {
                throw new GraphQLError('User is already a member of this workspace', {
                    extensions: {
                        code: 'ALREADY_WORKSPACE_MEMBER',
                        httpStatus: 400,
                    },
                });
            }
            const result = await this.workspaceRepository.addMemberToWorkspace(workspaceId, memberId, 'member');
            console.log(member.email);
            this.rabbitmqproducer.sendMail(member.email, 'added to workSpace', 'congratulation you have been successfully added to workspace');
            return result;
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
    async addChannelToWorkspaceService(workspaceId, channelName, userId) {
        try {
            const workspace = await this.workspaceRepository.getWorkspaceDetailsById(workspaceId);
            if (!workspace) {
                throw new GraphQLError('Workspace not found', {
                    extensions: {
                        code: 'WORKSPACE_NOT_FOUND',
                        httpStatus: 404,
                    },
                });
            }
            const isAdmin = this.isUserAdminOfWorkspace(workspace, userId);
            if (!isAdmin) {
                throw new GraphQLError('User is not an admin of the workspace', {
                    extensions: {
                        code: 'USER_NOT_ADMIN',
                        httpStatus: 403,
                    },
                });
            }
            const isChannelPartOfWorkspace = this.isChannelAlredyPartOfWorkSpace(workspace, channelName);
            if (isChannelPartOfWorkspace) {
                throw new GraphQLError('Channel already part of workspace', {
                    extensions: {
                        code: 'CHANNEL_ALREADY_EXISTS',
                        httpStatus: 400,
                    },
                });
            }
            return await this.workspaceRepository.addChannelToWorkspace(workspaceId, channelName);
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
};
WorkspaceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WorkRepository,
        UserService,
        RabbitMqProducer])
], WorkspaceService);
export { WorkspaceService };
//# sourceMappingURL=workspace.service.js.map