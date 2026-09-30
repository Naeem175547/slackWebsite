import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service.js';
import { WorkspaceResolver } from './workspace.resolver.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entity/workspace.entity.js';
import { WorkspaceMemberEntity } from './entity/workspace-member.entity.js';
import { UserModule } from '../user/user.module.js';
import { WorkRepository } from './workspace.repository.js';
import { ChannelModule } from '../channel/channel.module.js';
import { ChannelEntity } from '../channel/entity/channel.entity.js';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspaceEntity,
      WorkspaceMemberEntity,
      ChannelEntity,
    ]),
    UserModule,
    ChannelModule,
    RabbitmqModule,
  ],
  providers: [WorkspaceService, WorkspaceResolver, WorkRepository],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
