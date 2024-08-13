import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { AuthGuard, UserRequest } from 'src/common/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ){}
 
    @Post()
    async create(
        @Req() req:UserRequest,
        @Body()body: CreateTasksDto
    ){
        return await this.tasksService.create(body, req.user.sub); 
    }

    @Get()
    async findAll(@Req() req:UserRequest,){
        return await this.tasksService.findAll(req.user.sub)
    }

    @Get(':id')
    findOne(
        @Req() req:UserRequest,
        @Param('id')id
    ){
        return this.tasksService.findOne(id, req.user.sub)
    }

    // @Patch()
    // update(){

    // }

    // @Delete()
    // remove(){
        
    // }
}
