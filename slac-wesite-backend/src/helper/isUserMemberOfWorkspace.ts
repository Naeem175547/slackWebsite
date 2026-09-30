export function isUserMemberOfWorkspace(workspace: any, userId: number) {
  return workspace.members.some((member: any) => userId === member.user.id);
}
