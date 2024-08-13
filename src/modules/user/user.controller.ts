import { Controller, Get, Post, Body, Patch, Param, Delete, Header, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';
import { AuthGuard, UserRequest } from 'src/common/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() {password, ...createUserDto}: CreateUserDto,
    @Body('password', HashPasswordPipe) hash:string
  ) {
    // throw new Error('teste')
    return this.userService.create({
      ...createUserDto,
      password: hash
    });
  }

  //Editar para puxar o Id pelo JWT
  @Get()
  @UseGuards(AuthGuard)
  findOne(@Req() req:UserRequest) {
    // console.log(reqd.user)
    return this.userService.findOne(req.user.sub);
  }
}
