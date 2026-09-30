var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { ChannelRepository } from './channel.repository.js';
import { isUserMemberOfWorkspace } from '../helper/isUserMemberOfWorkspace.js';
let ChannelService = class ChannelService {
    channelRepository;
    constructor(channelRepository) {
        this.channelRepository = channelRepository;
    }
    async getChannelByIdService(channelId, userId) {
        try {
            const channel = await this.channelRepository.getChannelWithAllDetails(channelId);
            if (!channel || !channel.workspace) {
                throw new NotFoundException('Channel not found with the provided ID');
            }
            const isUserPartOfWorkspace = isUserMemberOfWorkspace(channel.workspace, userId);
            console.log(channel);
            console.log(channel.workspace.members);
            if (!isUserPartOfWorkspace) {
                throw new UnauthorizedException('User is not a member of the workspace and hence cannot access the channel');
            }
            return channel;
        }
        catch (error) {
            console.log('Get channel by ID service error', error);
            throw error;
        }
    }
};
ChannelService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ChannelRepository])
], ChannelService);
export { ChannelService };
//# sourceMappingURL=channel.service.js.map