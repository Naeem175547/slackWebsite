import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WorkspaceService } from '../workspace/workspace.service.js';
import { GraphQLError } from 'graphql';
import { UserService } from '../user/user.service.js';

@Injectable()
export class MemberService {
  constructor(
    private workspaceService: WorkspaceService,
    private userService: UserService,
  ) {}
  async isMemberPartOfWorkspaceService(workspaceId: number, memberId: number) {
    const workspace = await this.workspaceService.getWorksapceService(
      workspaceId,
      memberId,
    );
    return this.userService.findOne(memberId);
  }
}

// import { StatusCodes } from 'http-status-codes';

// import userRepository from '../repositories/userRepository.js';
// import workspaceRepository from '../repositories/workspaceRepository.js';
// import ClientError from '../utils/errors/clientError.js';
// import { isUserMemberOfWorkspace } from './workspaceService.js';

// export const isMemberPartOfWorkspaceService = async (workspaceId, memberId) => {
//   const workspace = await workspaceRepository.getById(workspaceId);

//   const isUserAMember = isUserMemberOfWorkspace(workspace, memberId);

//   if (!isUserAMember) {
//     throw new ClientError({
//       explanation: 'User is not a member of the workspace',
//       message: 'User is not a member of the workspace',
//       statusCode: StatusCodes.UNAUTHORIZED
//     });
//   }
//   const user = await userRepository.getById(memberId);
//   return user;
// };
