import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private readonly tasksRepository: Repository<TasksEntity>,

        private readonly userService:UserService
    ){}

    async create(task:CreateTasksDto, userId){
        const user = await this.userService.findOne(userId)
        const createdTask = new TasksEntity
        Object.assign(createdTask, task as TasksEntity)
        createdTask.user=user
        await this.tasksRepository.save(createdTask)
        return {
            message: 'Task cadastrada',
            statusCode: 201
        }
    }

    async findAll(userId:string){
        const user = await this.userService.findOne(userId)
        const tasks:TasksEntity[] = await this.tasksRepository.findBy({user})

        return tasks
    }

    async findOne(id:string, userId:string){
        const user = await this.userService.findOne(userId)
        const task = await this.tasksRepository.findOne({
            where:{
                id: id,
                user:user
            }
        })
        
        if(task===null){
            throw new NotFoundException('Task não encontrada')
        }

        return task
    }
}
