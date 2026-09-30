import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity.js';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  // CREATE
  async create(data: Partial<MessageEntity>) {
    const message = this.messageRepository.create(data);
    return await this.messageRepository.save(message);
  }

  // READ - all messages
  async findAll() {
    return await this.messageRepository.find();
  }

  // READ - one message by ID
  async findOne(id: number) {
    return await this.messageRepository.findOne({
      where: { id },
    });
  }

  // READ - with relations
  async findOneWithRelations(id: number) {
    return await this.messageRepository.findOne({
      where: { id },
      relations: {
        user: true,
        channel: true,
        workspace: true,
      },
    });
  }

  async getPaginatedMessage(messageParams: any, page: number, limit: number) {
    return this.messageRepository.find({
      order: { createdAt: 'DESC' },
      where: messageParams,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // READ - messages by channel
  async findByChannel(channelId: number) {
    return await this.messageRepository.find({
      where: {
        channel: {
          id: channelId,
        },
      },
    });
  }

  // READ - messages by workspace
  async findByWorkspace(workspaceId: number) {
    return await this.messageRepository.find({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
    });
  }

  // READ - messages by workspace
  async findByUser(userId: number) {
    return await this.messageRepository.find({
      where: {
        workspace: {
          id: userId,
        },
      },
    });
  }

  //   // UPDATE
  //   async update(id: number, data: Partial<MessageEntity>) {
  //     return await this.messageRepository.update(id, data);
  //   }

  // UPDATE + return updated entity
  async update(id: number, data: Partial<MessageEntity>) {
    await this.messageRepository.update(id, data);
    return await this.messageRepository.findOne({
      where: { id },
    });
  }

  // DELETE
  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id: id });
    await this.messageRepository.delete(id);
    return message;
  }

  //   // DELETE entity
  //   async removeEntity(message: MessageEntity) {
  //     return await this.messageRepository.remove(message);
  //   }

  // COUNT
  async count() {
    return await this.messageRepository.count();
  }

  // EXISTS
  async exists(id: number) {
    return await this.messageRepository.exists({
      where: { id },
    });
  }
}
