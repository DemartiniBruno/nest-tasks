import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule, 
    TasksModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
