var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity.js';
import { WorkspaceEntity } from '../entity/workspace.entity.js';
let WorkspaceMemberEntity = class WorkspaceMemberEntity {
    id;
    user;
    workspace;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], WorkspaceMemberEntity.prototype, "id", void 0);
__decorate([
    ManyToOne(() => UserEntity, (user) => user.workspaceMembers, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'user_id' }),
    __metadata("design:type", Object)
], WorkspaceMemberEntity.prototype, "user", void 0);
__decorate([
    ManyToOne(() => WorkspaceEntity, (workspace) => workspace.members, {
        onDelete: 'CASCADE',
    }),
    JoinColumn({ name: 'workspace_id' }),
    __metadata("design:type", Object)
], WorkspaceMemberEntity.prototype, "workspace", void 0);
__decorate([
    Column({
        type: 'enum',
        enum: ['admin', 'member'],
        default: 'member',
    }),
    __metadata("design:type", String)
], WorkspaceMemberEntity.prototype, "role", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], WorkspaceMemberEntity.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], WorkspaceMemberEntity.prototype, "updatedAt", void 0);
WorkspaceMemberEntity = __decorate([
    Entity({ name: 'workspace_members' })
], WorkspaceMemberEntity);
export { WorkspaceMemberEntity };
//# sourceMappingURL=workspace-member.entity.js.map