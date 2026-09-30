import { MemberService } from './member.service.js';
export declare class MemberResolver {
    private memberService;
    constructor(memberService: MemberService);
    isUserMemberOfWorkspace(workspaceId: number, context: any): Promise<import("../user/entities/user.entity.js").UserEntity>;
}
