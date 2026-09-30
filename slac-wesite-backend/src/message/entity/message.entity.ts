import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity.js';
import { ChannelEntity } from '../../channel/entity/channel.entity.js';
import { WorkspaceEntity } from '../../workspace/entity/workspace.entity.js';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user.messages, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToOne(() => ChannelEntity, (channel) => channel.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'channel_id' })
  channel: Relation<ChannelEntity>;

  @ManyToOne(
    () => WorkspaceEntity,
    (WorkspaceEntity) => WorkspaceEntity.messages,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
