import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashPasswordPipe } from 'src/common/pipes/hash-password.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() {password, ...createUserDto}: CreateUserDto,
    @Body('password', HashPasswordPipe) hash:string
  ) {
    return this.userService.create({
      ...createUserDto,
      password: hash
    });
  }

  //Editar para puxar o Id pelo JWT
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
