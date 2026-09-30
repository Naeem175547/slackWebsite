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
import { User } from '../../user/types/user.type.js';
let WorkspaceMember = class WorkspaceMember {
    id;
    user;
    role;
    createdAt;
    updatedAt;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], WorkspaceMember.prototype, "id", void 0);
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], WorkspaceMember.prototype, "user", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], WorkspaceMember.prototype, "role", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], WorkspaceMember.prototype, "createdAt", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], WorkspaceMember.prototype, "updatedAt", void 0);
WorkspaceMember = __decorate([
    ObjectType()
], WorkspaceMember);
export { WorkspaceMember };
let WorkspaceMemberResponse = class WorkspaceMemberResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], WorkspaceMemberResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], WorkspaceMemberResponse.prototype, "message", void 0);
__decorate([
    Field(),
    __metadata("design:type", WorkspaceMember)
], WorkspaceMemberResponse.prototype, "data", void 0);
WorkspaceMemberResponse = __decorate([
    ObjectType()
], WorkspaceMemberResponse);
export { WorkspaceMemberResponse };
//# sourceMappingURL=workspace.member.type.js.map