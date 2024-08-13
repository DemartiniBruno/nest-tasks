import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './providers/user.provider';
import { DatabaseModule } from 'src/common/database/database.module';
import { UniqueEmailValidator } from 'src/common/decorators/unique-email.validator';

@Module({
  imports:[DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders,
    UniqueEmailValidator
  ],
  exports:[
    UserService
  ]
})
export class UserModule {}
