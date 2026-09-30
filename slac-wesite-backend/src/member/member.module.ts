import { Module } from '@nestjs/common';
import { MemberService } from './member.service.js';
import { MemberResolver } from './member.resolver.js';
import { WorkspaceModule } from '../workspace/workspace.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [WorkspaceModule, UserModule],
  providers: [MemberService, MemberResolver],
})
export class MemberModule {}
