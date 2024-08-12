import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { TaskStatsEnum } from "../enum/task-stats.enum"

export class CreateTasksDto {
    
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    description:string

    @IsOptional()
    @IsEnum(TaskStatsEnum)
    stats:TaskStatsEnum
}