var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceMemberEntity } from './workspace-member.entity.js';
let WorkspaceEntity = class WorkspaceEntity {
    id;
    name;
    description;
    joinCode;
    messages;
    channels;
    members;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WorkspaceEntity.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], WorkspaceEntity.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], WorkspaceEntity.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], WorkspaceEntity.prototype, "joinCode", void 0);
__decorate([
    OneToMany(() => MessageEntity, (message) => message.workspace),
    __metadata("design:type", Object)
], WorkspaceEntity.prototype, "messages", void 0);
__decorate([
    OneToMany(() => ChannelEntity, (channel) => channel.workspace),
    __metadata("design:type", Object)
], WorkspaceEntity.prototype, "channels", void 0);
__decorate([
    OneToMany(() => WorkspaceMemberEntity, (workspaceMember) => workspaceMember.workspace),
    __metadata("design:type", Object)
], WorkspaceEntity.prototype, "members", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], WorkspaceEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], WorkspaceEntity.prototype, "updatedAt", void 0);
WorkspaceEntity = __decorate([
    Entity({ name: 'workspaces' })
], WorkspaceEntity);
export { WorkspaceEntity };
//# sourceMappingURL=workspace.entity.js.map