var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, OneToMany, } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity.js';
import { WorkspaceMemberEntity } from '../../workspace/entity/workspace-member.entity.js';
let UserEntity = class UserEntity {
    id;
    email;
    name;
    password;
    username;
    avatar;
    messages;
    workspaceMembers;
    createdAt;
    updatedAt;
    generateAvatar() {
        this.avatar = `https://robohash.org/${this.username}`;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    OneToMany(() => MessageEntity, (message) => message.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "messages", void 0);
__decorate([
    OneToMany(() => WorkspaceMemberEntity, (workspaceMember) => workspaceMember.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "workspaceMembers", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "generateAvatar", null);
UserEntity = __decorate([
    Entity({ name: 'users' })
], UserEntity);
export { UserEntity };
//# sourceMappingURL=user.entity.js.map