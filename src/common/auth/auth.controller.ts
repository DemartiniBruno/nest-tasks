import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FindUserDto } from './dto/find-user.dto';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('/login')
    async login(
        @Body() body: FindUserDto,
    ) {
        // console.log()
        return await this.authService.singIn(body)
    }
}
