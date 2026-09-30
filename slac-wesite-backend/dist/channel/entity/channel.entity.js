var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { MessageEntity } from "../../message/entity/message.entity.js";
import { WorkspaceEntity } from "../../workspace/entity/workspace.entity.js";
let ChannelEntity = class ChannelEntity {
    id;
    name;
    createdAt;
    updatedAt;
    messages;
    workspace;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ChannelEntity.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ChannelEntity.prototype, "name", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], ChannelEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], ChannelEntity.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => MessageEntity, (message) => message.channel),
    __metadata("design:type", Object)
], ChannelEntity.prototype, "messages", void 0);
__decorate([
    ManyToOne(() => WorkspaceEntity, (workspace) => workspace.channels, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'workspace_id' }),
    __metadata("design:type", Object)
], ChannelEntity.prototype, "workspace", void 0);
ChannelEntity = __decorate([
    Entity({ name: 'channels' })
], ChannelEntity);
export { ChannelEntity };
//# sourceMappingURL=channel.entity.js.map