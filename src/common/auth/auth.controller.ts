import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/login')
    async login(@Body() body){
        // console.log()
        return await this.authService.singIn(body.email, body.password)
    }
}
