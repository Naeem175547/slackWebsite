import { WorkspaceEntity } from './entity/workspace.entity.js';
import { CreateWorkspaceInput } from './dto/create.workspace.input.js';
import { WorkRepository } from './workspace.repository.js';
import { UpdateWorkspaceInput } from './dto/update.workspace.input.js';
import { UserService } from '../user/user.service.js';
import { RabbitMqProducer } from '../rabbitmq/rabbitmq.producer.js';
export declare class WorkspaceService {
    private readonly workspaceRepository;
    private readonly userService;
    private readonly rabbitmqproducer;
    constructor(workspaceRepository: WorkRepository, userService: UserService, rabbitmqproducer: RabbitMqProducer);
    isUserAdminOfWorkspace(workspace: WorkspaceEntity, userId: number): boolean;
    isUserMemberOfWorkspace(workspace: WorkspaceEntity, userId: number): boolean;
    isChannelAlredyPartOfWorkSpace(worksapce: WorkspaceEntity, channelName: string): boolean;
    createWorkspaceService(createWorkspaceDto: CreateWorkspaceInput & {
        ownerId: number;
    }): Promise<WorkspaceEntity>;
    deleteWorkspaceService(workspaceId: number, userId: number): Promise<any>;
    getAllWorkspacesByMemberId(userId: number): Promise<WorkspaceEntity[]>;
    getWorksapceService(workspaceId: number, userId: number): Promise<WorkspaceEntity>;
    getWorkspaceByJoinCodeService(joinCode: string, userId: number): Promise<WorkspaceEntity>;
    UpdateWorkspaceService(workspaceId: number, updateWorkspaceInput: UpdateWorkspaceInput, userId: number): Promise<WorkspaceEntity>;
    addMemberToWorkspaceService(workspaceId: number, memberId: number, userId: number): Promise<import("./entity/workspace-member.entity.js").WorkspaceMemberEntity>;
    addChannelToWorkspaceService(workspaceId: number, channelName: string, userId: number): Promise<WorkspaceEntity>;
}
