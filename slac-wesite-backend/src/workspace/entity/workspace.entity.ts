import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Relation } from 'typeorm';

import { MessageEntity } from '../../message/entity/message.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceMemberEntity } from './workspace-member.entity.js';

@Entity({ name: 'workspaces' })
export class WorkspaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  joinCode: string;

  // One Workspace → Many Messages
  @OneToMany(() => MessageEntity, (message) => message.workspace)
  messages: Relation<MessageEntity[]>;

  // One Workspace → Many Channels
  @OneToMany(() => ChannelEntity, (channel) => channel.workspace)
  channels: Relation<ChannelEntity[]>;

  // One Workspace → Many WorkspaceMembers
  @OneToMany(
    () => WorkspaceMemberEntity,
    (workspaceMember) => workspaceMember.workspace,
  )
  members: Relation<WorkspaceMemberEntity[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
