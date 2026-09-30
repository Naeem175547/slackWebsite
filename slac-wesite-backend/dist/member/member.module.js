var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MemberService } from './member.service.js';
import { MemberResolver } from './member.resolver.js';
import { WorkspaceModule } from '../workspace/workspace.module.js';
import { UserModule } from '../user/user.module.js';
let MemberModule = class MemberModule {
};
MemberModule = __decorate([
    Module({
        imports: [WorkspaceModule, UserModule],
        providers: [MemberService, MemberResolver],
    })
], MemberModule);
export { MemberModule };
//# sourceMappingURL=member.module.js.map