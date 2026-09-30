import { WorkspaceService } from '../workspace/workspace.service.js';
import { UserService } from '../user/user.service.js';
export declare class MemberService {
    private workspaceService;
    private userService;
    constructor(workspaceService: WorkspaceService, userService: UserService);
    isMemberPartOfWorkspaceService(workspaceId: number, memberId: number): Promise<import("../user/entities/user.entity.js").UserEntity>;
}
