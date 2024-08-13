import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global:true,
      secret: String(process.env.JWT_SECRET),
      // secret:'paste',
      signOptions: { expiresIn: '60m'}
    })
  ],
  controllers: [AuthController],
  providers:[AuthService],
  exports:[
    AuthService
  ]
})

export class AuthModule {}
