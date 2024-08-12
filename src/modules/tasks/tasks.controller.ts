import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}
 
    @Post()
    async create(@Body()body: CreateTasksDto){
        return await this.tasksService.create(body); 
    }

    @Get()
    findAll(){

    }

    @Get()
    findOne(){

    }

    @Patch()
    update(){

    }

    @Delete()
    remove(){
        
    }
}
