import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule, 
    TasksModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
