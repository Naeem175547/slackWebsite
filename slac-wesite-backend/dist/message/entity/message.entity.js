var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceEntity } from '../../workspace/entity/workspace.entity.js';
let MessageEntity = class MessageEntity {
    id;
    body;
    image;
    user;
    channel;
    workspace;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MessageEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MessageEntity.prototype, "body", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MessageEntity.prototype, "image", void 0);
__decorate([
    ManyToOne(() => UserEntity, (user) => user.messages, {
        onDelete: 'SET NULL',
    }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Object)
], MessageEntity.prototype, "user", void 0);
__decorate([
    ManyToOne(() => ChannelEntity, (channel) => channel.messages, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'channel_id' }),
    __metadata("design:type", Object)
], MessageEntity.prototype, "channel", void 0);
__decorate([
    ManyToOne(() => WorkspaceEntity, (WorkspaceEntity) => WorkspaceEntity.messages, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'workspace_id' }),
    __metadata("design:type", Object)
], MessageEntity.prototype, "workspace", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], MessageEntity.prototype, "updatedAt", void 0);
MessageEntity = __decorate([
    Entity({ name: 'messages' })
], MessageEntity);
export { MessageEntity };
//# sourceMappingURL=message.entity.js.map