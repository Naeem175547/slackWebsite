var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { UserService } from '../user/user.service.js';
let MemberService = class MemberService {
    workspaceService;
    userService;
    constructor(workspaceService, userService) {
        this.workspaceService = workspaceService;
        this.userService = userService;
    }
    async isMemberPartOfWorkspaceService(workspaceId, memberId) {
        const workspace = await this.workspaceService.getWorksapceService(workspaceId, memberId);
        return this.userService.findOne(memberId);
    }
};
MemberService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [WorkspaceService,
        UserService])
], MemberService);
export { MemberService };
//# sourceMappingURL=member.service.js.map