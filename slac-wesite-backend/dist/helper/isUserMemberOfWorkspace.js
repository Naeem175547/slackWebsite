export function isUserMemberOfWorkspace(workspace, userId) {
    return workspace.members.some((member) => userId === member.user.id);
}
//# sourceMappingURL=isUserMemberOfWorkspace.js.map