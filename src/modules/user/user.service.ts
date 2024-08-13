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

      await this.userRepository.save(createdUser)

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

  //Editar para puxar o Id pelo JWT
  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user;
  }

  async teste(email){
    const user = await this.userRepository.findOneBy({email})

    return user
  }

}
