var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let WorkspaceModule = class WorkspaceModule {
};
WorkspaceModule = __decorate([
    Module({
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
], WorkspaceModule);
export { WorkspaceModule };
//# sourceMappingURL=workspace.module.js.map