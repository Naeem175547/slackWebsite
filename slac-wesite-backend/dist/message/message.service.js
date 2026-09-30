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
import { GraphQLError } from 'graphql';
import { MessageRepository } from './message.repository.js';
import { ChannelRepository } from '../channel/channel.repository.js';
import { isUserMemberOfWorkspace } from '../helper/isUserMemberOfWorkspace.js';
import { ChannelService } from '../channel/channel.service.js';
import { UserService } from '../user/user.service.js';
let MessageService = class MessageService {
    messageRepository;
    channelRepository;
    channelService;
    userService;
    constructor(messageRepository, channelRepository, channelService, userService) {
        this.messageRepository = messageRepository;
        this.channelRepository = channelRepository;
        this.channelService = channelService;
        this.userService = userService;
    }
    async getPaginatedMessageSerive(messageParams, page, limit, userId) {
        try {
            const channelId = messageParams.channelId;
            if (!channelId) {
                throw new GraphQLError('Channel ID is required');
            }
            const channel = await this.channelRepository.getChannelWithAllDetails(channelId);
            if (!channel) {
                throw new GraphQLError('Channel not found');
            }
            const workspace = channel.workspace;
            const isMember = isUserMemberOfWorkspace(workspace, userId);
            if (!isMember) {
                throw new GraphQLError('user not the member of workspace');
            }
            return await this.messageRepository.getPaginatedMessage(messageParams, page, limit);
        }
        catch (error) {
            if (error instanceof GraphQLError) {
                throw error;
            }
            throw new GraphQLError('Failed to fetch messages');
        }
    }
    async createMessageService(data, userId) {
        const channelId = data.channelId;
        const channel = await this.channelService.getChannelByIdService(channelId, userId);
        if (!channel) {
            throw new GraphQLError('Channel not found');
        }
        const workspace = channel.workspace;
        if (!workspace) {
            throw new GraphQLError('Workspace not found');
        }
        const isMember = await isUserMemberOfWorkspace(workspace.id, userId);
        if (!isMember) {
            throw new GraphQLError('You are not a member of this workspace');
        }
        const user = await this.userService.findOne(userId);
        const message = await this.messageRepository.create({
            body: data.body,
            image: data.image,
            channel: channel,
            workspace: workspace,
            user,
        });
        return message;
    }
};
MessageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MessageRepository,
        ChannelRepository,
        ChannelService,
        UserService])
], MessageService);
export { MessageService };
//# sourceMappingURL=message.service.js.map