import { CreateWorkspaceInput } from './dto/create.workspace.input.js';
import { WorkspaceService } from './workspace.service.js';
import { UpdateWorkspaceInput } from './dto/update.workspace.input.js';
export declare class WorkspaceResolver {
    private readonly workspaceService;
    constructor(workspaceService: WorkspaceService);
    createWorkspace(createWorkspaceInput: CreateWorkspaceInput, context: any): Promise<import("./entity/workspace.entity.js").WorkspaceEntity>;
    deleteWorkspace(workspaceId: number, context: any): Promise<any>;
    getWorkspacesOfUserByMember(context: any): Promise<import("./entity/workspace.entity.js").WorkspaceEntity[]>;
    getWorkSpace(workspaceId: number, context: any): Promise<import("./entity/workspace.entity.js").WorkspaceEntity>;
    getWorkspaceByJoinCode(joinCode: string, context: any): Promise<import("./entity/workspace.entity.js").WorkspaceEntity>;
    UpdateWorkspace(workspaceId: number, updateWorkspaceInput: UpdateWorkspaceInput, context: any): Promise<import("./entity/workspace.entity.js").WorkspaceEntity>;
    addMemberToWorkspace(context: any, workspaceId: number, memberId: number): Promise<import("./entity/workspace-member.entity.js").WorkspaceMemberEntity>;
    addChannelToWorkspace(context: any, workspaceId: number, channelName: string): Promise<import("./entity/workspace.entity.js").WorkspaceEntity>;
}
