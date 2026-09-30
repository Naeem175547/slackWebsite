import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthGuards } from '../common/guards/auth.guard.js';
import { CreateWorkspaceInput } from './dto/create.workspace.input.js';
import { WorkspaceService } from './workspace.service.js';
import { WorkspaceResponse, WorkspacesResponse } from './dto/workspace.type.js';
import { UpdateWorkspaceInput } from './dto/update.workspace.input.js';
import {
  WorkspaceMember,
  WorkspaceMemberResponse,
} from './dto/workspace.member.type.js';
@UseGuards(AuthGuards)
@Resolver()
export class WorkspaceResolver {
  constructor(private readonly workspaceService: WorkspaceService) {}
  @Mutation(() => WorkspaceResponse)
  createWorkspace(
    @Args('createWorkspaceInput') createWorkspaceInput: CreateWorkspaceInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.createWorkspaceService({
      ...createWorkspaceInput,
      ownerId: userId,
    });
  }
  @Mutation(() => WorkspaceResponse)
  deleteWorkspace(
    @Args('workspaceId') workspaceId: number,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.deleteWorkspaceService(workspaceId, userId);
  }

  @Query(() => WorkspacesResponse)
  getWorkspacesOfUserByMember(@Context() context: any) {
    const userId = context.req.user.id;
    return this.workspaceService.getAllWorkspacesByMemberId(userId);
  }

  @Query(() => WorkspaceResponse)
  getWorkSpace(
    @Args('workspaceId') workspaceId: number,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.getWorksapceService(workspaceId, userId);
  }

  @Query(() => WorkspaceResponse)
  getWorkspaceByJoinCode(
    @Args('joinCode') joinCode: string,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.getWorkspaceByJoinCodeService(
      joinCode,
      userId,
    );
  }

  @Mutation(() => WorkspaceResponse)
  UpdateWorkspace(
    @Args('workspaceId') workspaceId: number,
    @Args('updateWorkspaceInput') updateWorkspaceInput: UpdateWorkspaceInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    console.log('UPDATE INPUT:', updateWorkspaceInput);

    return this.workspaceService.UpdateWorkspaceService(
      workspaceId,
      updateWorkspaceInput,
      userId,
    );
  }

  @Mutation(() => WorkspaceMemberResponse)
  addMemberToWorkspace(
    @Context() context: any,
    @Args('workspaceId') workspaceId: number,
    @Args('memberId') memberId: number,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.addMemberToWorkspaceService(
      workspaceId,
      memberId,
      userId,
    );
  }

  @Mutation(() => WorkspaceResponse)
  addChannelToWorkspace(
    @Context() context: any,
    @Args('workspaceId') workspaceId: number,
    @Args('channelName') channelName: string,
  ) {
    const userId = context.req.user.id;
    return this.workspaceService.addChannelToWorkspaceService(
      workspaceId,
      channelName,
      userId,
    );
  }
}
