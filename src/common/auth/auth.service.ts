import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async singIn(credentials:FindUserDto) {
        const user = await this.userService.findEmail(credentials.email)

        const teste = await bcrypt.compare(
            credentials.password,
            user.password!,
        )

        if(!await bcrypt.compare(credentials.password, user.password)){
            throw new UnauthorizedException('Email ou senha incorretos')
        }

        const payload = {
            id:user.id,
            email: user.email,
            name: user.name
        }

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
