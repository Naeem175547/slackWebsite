import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { MessageEntity } from '../../message/entity/message.entity.js';
import { WorkspaceMemberEntity } from '../../workspace/entity/workspace-member.entity.js';
import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToMany(
    () => WorkspaceMemberEntity,
    (workspaceMember) => workspaceMember.user,
  )
  workspaceMembers: Relation<WorkspaceMemberEntity>[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({default:false})
  isVarified:boolean

  @Column({nullable:true})
  token:string | null

  @Column({ type: 'datetime', nullable: true })
   tokenExpiryDate: Date | null;


  @BeforeInsert()
  generate() {
    this.avatar = `https://robohash.org/${this.username}`;
    this.token=uuidv4().substring(0,10).toUpperCase();
    this.tokenExpiryDate=new Date(Date.now()+1000*60*60);
  }

}
