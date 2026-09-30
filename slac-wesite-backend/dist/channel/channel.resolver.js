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
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { FullChannelResponse } from './types/channel.type.js';
import { ChannelService } from './channel.service.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuards } from '../common/guards/auth.guard.js';
let ChannelResolver = class ChannelResolver {
    channelService;
    constructor(channelService) {
        this.channelService = channelService;
    }
    getChannelById(channelId, context) {
        const userId = context.req.user.id;
        return this.channelService.getChannelByIdService(channelId, userId);
    }
};
__decorate([
    Query(() => FullChannelResponse),
    __param(0, Args('channelId')),
    __param(1, Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ChannelResolver.prototype, "getChannelById", null);
ChannelResolver = __decorate([
    UseGuards(AuthGuards),
    Resolver(),
    __metadata("design:paramtypes", [ChannelService])
], ChannelResolver);
export { ChannelResolver };
//# sourceMappingURL=channel.resolver.js.map