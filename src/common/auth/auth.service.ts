import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt'

export interface UserPayload{
    sub:string,
    name:string,
    email:string
}

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

        const payload:UserPayload = {
            sub:user.id,
            name: user.name,
            email: user.email
        }

        return{
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
