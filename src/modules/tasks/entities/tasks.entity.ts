import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatsEnum } from "../enum/task-stats.enum";
import { UsersEntity } from "src/modules/user/entities/user.entity";

@Entity({name:'tasks'})
export class TasksEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({name:'name', type:'varchar'})
    name:string

    @Column({name:'description', type:'varchar'})
    description:string

    @Column({name:'stats', type:'varchar', default:TaskStatsEnum.PENDENT})
    stats:TaskStatsEnum

    @ManyToOne(()=>UsersEntity, (user)=>user.tasks)
    user:UsersEntity
}