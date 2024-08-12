import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
    async findAll(){
        return await this.tasksService.findAll()
    }

    @Get(':id')
    findOne(@Param('id')id){
        return this.tasksService.findOne(id)
    }

    @Patch()
    update(){

    }

    @Delete()
    remove(){
        
    }
}
