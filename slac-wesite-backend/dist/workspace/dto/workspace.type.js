var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../../message/types/message.type.js';
import { Channel } from '../../channel/types/channel.type.js';
import { WorkspaceMember } from './workspace.member.type.js';
let Workspace = class Workspace {
    id;
    name;
    description;
    joinCode;
    channels;
    messages;
    members;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], Workspace.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Workspace.prototype, "name", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Workspace.prototype, "description", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Workspace.prototype, "joinCode", void 0);
__decorate([
    Field(() => [Channel], { nullable: true }),
    __metadata("design:type", Array)
], Workspace.prototype, "channels", void 0);
__decorate([
    Field(() => [Message], { nullable: true }),
    __metadata("design:type", Array)
], Workspace.prototype, "messages", void 0);
__decorate([
    Field(() => [WorkspaceMember], { nullable: true }),
    __metadata("design:type", Array)
], Workspace.prototype, "members", void 0);
Workspace = __decorate([
    ObjectType()
], Workspace);
export { Workspace };
let WorkspaceResponse = class WorkspaceResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], WorkspaceResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], WorkspaceResponse.prototype, "message", void 0);
__decorate([
    Field(() => Workspace, { nullable: true }),
    __metadata("design:type", Workspace)
], WorkspaceResponse.prototype, "data", void 0);
WorkspaceResponse = __decorate([
    ObjectType()
], WorkspaceResponse);
export { WorkspaceResponse };
let WorkspacesResponse = class WorkspacesResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], WorkspacesResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], WorkspacesResponse.prototype, "message", void 0);
__decorate([
    Field(() => [Workspace], { nullable: true }),
    __metadata("design:type", Array)
], WorkspacesResponse.prototype, "data", void 0);
WorkspacesResponse = __decorate([
    ObjectType()
], WorkspacesResponse);
export { WorkspacesResponse };
//# sourceMappingURL=workspace.type.js.map