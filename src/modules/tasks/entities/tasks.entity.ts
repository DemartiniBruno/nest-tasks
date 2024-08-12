import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatsEnum } from "../enum/task-stats.enum";

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
}