import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './providers/user.provider';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  imports:[DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders
  
  ],
  exports:[
    UserService
  ]
})
export class UserModule {}
