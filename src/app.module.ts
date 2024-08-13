import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './common/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule, 
    TasksModule, 
    UserModule, 
    AuthModule,
    CacheModule.register({
      
      // useFactory: async () => ({
      //   store: await redisStore({ ttl: 10 * 1000 }),
      // }),
      isGlobal: true,
      ttl: 10 * 1000
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule {}
