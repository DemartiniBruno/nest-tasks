import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { CreateTasksDto } from './dto/create-tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private readonly tasksRepository: Repository<TasksEntity>
    ){}

    async create(task:CreateTasksDto){
        const createdTask = await this.tasksRepository.save(task)
        // await this.tasksRepository.save()
    }

    async findAll(){
        return await this.tasksRepository.find()
    }

    async findOne(id){
        return await this.tasksRepository.findOneBy({id})
    }
}
