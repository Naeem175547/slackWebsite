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
import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { MessageService } from './message.service.js';
import { MessageResponse, PresignedUrlResponse, } from './types/message.type.js';
import { MessageParams } from './dto/input.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuards } from '../common/guards/auth.guard.js';
import { AwsService } from '../aws/aws.service.js';
let MessageResolver = class MessageResolver {
    messageService;
    awsService;
    constructor(messageService, awsService) {
        this.messageService = messageService;
        this.awsService = awsService;
    }
    async getPresignedUrl() {
        try {
            return await this.awsService.getPresignedUploadUrl(60);
        }
        catch (error) {
            console.log('Error in getPresignedUrl', error);
            throw new GraphQLError('Failed to generate presigned URL');
        }
    }
    async getPaginatedMessage(context, messageParams, page, limit) {
        return await this.messageService.getPaginatedMessageSerive(messageParams, page || 1, limit || 20, context.req.user.id);
    }
};
__decorate([
    Query(() => PresignedUrlResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getPresignedUrl", null);
__decorate([
    Query(() => MessageResponse),
    __param(0, Context()),
    __param(1, Args('messageParams', { type: () => MessageParams })),
    __param(2, Args('page', { type: () => Int, nullable: true })),
    __param(3, Args('limit', { type: () => Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MessageParams, Object, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getPaginatedMessage", null);
MessageResolver = __decorate([
    Resolver(),
    UseGuards(AuthGuards),
    __metadata("design:paramtypes", [MessageService,
        AwsService])
], MessageResolver);
export { MessageResolver };
//# sourceMappingURL=message.resolver.js.map