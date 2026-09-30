import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,ManyToOne,JoinColumn} from "typeorm";
import { MessageEntity } from "../../message/entity/message.entity.js";
import type { Relation } from "typeorm";
import { WorkspaceEntity } from "../../workspace/entity/workspace.entity.js";

@Entity({name:'channels'})
export class ChannelEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string


    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @OneToMany(()=>MessageEntity,(message)=>message.channel)
    messages:Relation<MessageEntity[]>

    @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.channels,{onDelete:'CASCADE'})
   @JoinColumn({ name: 'workspace_id' })
   workspace: Relation<WorkspaceEntity>
}