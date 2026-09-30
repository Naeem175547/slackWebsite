import { Repository } from 'typeorm';
import { WorkspaceEntity } from './entity/workspace.entity.js';
import { CreateWorkspaceInput } from './dto/create.workspace.input.js';
import { UserService } from '../user/user.service.js';
import { WorkspaceMemberEntity } from './entity/workspace-member.entity.js';
import { ChannelEntity } from '../channel/entity/channel.entity.js';
export declare class WorkRepository {
    private workSpaceRepo;
    private userService;
    private workspaceMemberRepository;
    private channelRepository;
    constructor(workSpaceRepo: Repository<WorkspaceEntity>, userService: UserService, workspaceMemberRepository: Repository<WorkspaceMemberEntity>, channelRepository: Repository<ChannelEntity>);
    create(createWorkspaceDto: CreateWorkspaceInput & {
        joinCode: string;
    }): Promise<WorkspaceEntity>;
    findAll(): Promise<WorkspaceEntity[]>;
    findById(id: number): Promise<WorkspaceEntity | null>;
    getWorkspaceDetailsById(workspaceId: number): Promise<WorkspaceEntity | null>;
    update(id: number, updateWorkspaceDto: Partial<CreateWorkspaceInput>): Promise<WorkspaceEntity>;
    delete(id: number): Promise<void>;
    deleteMany(ids: number[]): Promise<boolean>;
    findByName(name: string): Promise<WorkspaceEntity>;
    findByJoinCode(joinCode: string): Promise<WorkspaceEntity | null>;
    addMemberToWorkspace(workspaceId: number, userId: number, role: 'admin' | 'member'): Promise<WorkspaceMemberEntity>;
    addChannelToWorkspace(workspaceId: number, channelName: string): Promise<WorkspaceEntity>;
    fetchAllWorkspacesByMemberId(memberId: number): Promise<WorkspaceEntity[]>;
}
