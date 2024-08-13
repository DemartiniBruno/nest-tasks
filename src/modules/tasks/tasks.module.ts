import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../../common/database/database.module';
import { tasksProviders } from './providers/tasks.provider';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { usersProviders } from '../user/providers/user.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [TasksController],
  providers: [
    ...tasksProviders,
    TasksService,
    UserService,
    ...usersProviders
  ]
})
export class TasksModule {}
