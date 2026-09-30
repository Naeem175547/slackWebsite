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
import { Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity.js';
let MessageRepository = class MessageRepository {
    messageRepository;
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async create(data) {
        const message = this.messageRepository.create(data);
        return await this.messageRepository.save(message);
    }
    async findAll() {
        return await this.messageRepository.find();
    }
    async findOne(id) {
        return await this.messageRepository.findOne({
            where: { id },
        });
    }
    async findOneWithRelations(id) {
        return await this.messageRepository.findOne({
            where: { id },
            relations: {
                user: true,
                channel: true,
                workspace: true,
            },
        });
    }
    async getPaginatedMessage(messageParams, page, limit) {
        return this.messageRepository.find({
            order: { createdAt: 'DESC' },
            where: messageParams,
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async findByChannel(channelId) {
        return await this.messageRepository.find({
            where: {
                channel: {
                    id: channelId,
                },
            },
        });
    }
    async findByWorkspace(workspaceId) {
        return await this.messageRepository.find({
            where: {
                workspace: {
                    id: workspaceId,
                },
            },
        });
    }
    async findByUser(userId) {
        return await this.messageRepository.find({
            where: {
                workspace: {
                    id: userId,
                },
            },
        });
    }
    async update(id, data) {
        await this.messageRepository.update(id, data);
        return await this.messageRepository.findOne({
            where: { id },
        });
    }
    async remove(id) {
        const message = await this.messageRepository.findOneBy({ id: id });
        await this.messageRepository.delete(id);
        return message;
    }
    async count() {
        return await this.messageRepository.count();
    }
    async exists(id) {
        return await this.messageRepository.exists({
            where: { id },
        });
    }
};
MessageRepository = __decorate([
    Injectable(),
    __param(0, InjectRepository(MessageEntity)),
    __metadata("design:paramtypes", [Repository])
], MessageRepository);
export { MessageRepository };
//# sourceMappingURL=message.repository.js.map