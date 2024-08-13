import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async singIn(
        email: string,
        password: string
    ) {
        const user = await this.userService.findOne(email)

        //verificar se a senha é igual ao que ele tem no banco
        if(user.password!==password){
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
