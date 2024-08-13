import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTasksDto } from './dto/create-tasks.dto';
import { AuthGuard, UserRequest } from 'src/common/auth/auth.guard';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
    @UseInterceptors(CacheInterceptor)
    async findAll(@Req() req:UserRequest,){
        return await this.tasksService.findAll(req.user.sub)
    }

    @Get(':id')
    @UseInterceptors(CacheInterceptor)
    findOne(
        @Req() req:UserRequest,
        @Param('id')id
    ){
        return this.tasksService.findOne(id, req.user.sub)
    }

    @Patch(':id')
    update(
        @Req() req:UserRequest,
        @Param('id')id,
        @Body() body: UpdateTasksDto
    ){
        return this.tasksService.update(id, req.user.sub, body)
    }

    @Delete(':id')
    remove(
        @Req() req:UserRequest,
        @Param('id')id,
    ){
        return this.tasksService.remove(id, req.user.sub)
        
    }
}
