import { Args, Context, Query, Resolver } from '@nestjs/graphql';

import { User } from '../user/types/user.type.js';
import { MemberService } from './member.service.js';

@Resolver()
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Query(() => User)
  isUserMemberOfWorkspace(
    @Args('workspaceId') workspaceId: number,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;

    return this.memberService.isMemberPartOfWorkspaceService(
      workspaceId,
      userId,
    );
  }
}
