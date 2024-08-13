import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UsersEntity>
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {
      const createdUser = new UsersEntity

      Object.assign(createdUser, createUserDto as UsersEntity)

      return {
        success: true,
        message: 'Usuário criado'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // async findAll() {
  //   return await this.userRepository.find();
  // }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
