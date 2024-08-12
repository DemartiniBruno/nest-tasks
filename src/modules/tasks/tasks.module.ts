import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../../common/database/database.module';
import { tasksProviders } from './providers/tasks.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [TasksController],
  providers: [
    ...tasksProviders,
    TasksService,
  ]
})
export class TasksModule {}
