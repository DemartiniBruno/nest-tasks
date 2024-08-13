import { Exclude } from "class-transformer";
import { TasksEntity } from "src/modules/tasks/entities/tasks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'users'})
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({name: 'name', type:'varchar', length:100})
    name:string;

    @Column({name:'email', type:'varchar', length:50})
    email:string;

    @Column({name:'password', type:'varchar', nullable:false, select:false})
    @Exclude()
    password:string

    @OneToMany(()=>TasksEntity, (task)=>task.user)
    tasks:TasksEntity[]
}
