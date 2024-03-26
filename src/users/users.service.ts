import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';
import { OLD_PASSWORD_INCORRECT, USER_NOT_FOUND } from './constants/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(inUser: CreateUserDto) {
    const user = this.userRepository.create({
      login: inUser.login,
      password: inUser.password,
      version: 1,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    });
    return this.userRepository.save(user);
  }

  async update(id: string, inUser: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new CustomNotFoundException(USER_NOT_FOUND);
    }
    if (user.password !== inUser.oldPassword) {
      throw new WrongPasswordException(OLD_PASSWORD_INCORRECT);
    }

    const updatedUser = await this.userRepository.preload({
      id: id,
      ...user,
      password: inUser.newPassword,
      updatedAt: Date.now().toString(),
      version: user.version++,
    });

    return this.userRepository.save(updatedUser);
  }

  async getAll() {
    return this.userRepository.find();
  }

  async get(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new CustomNotFoundException(USER_NOT_FOUND);
    }

    return user;
  }

  async delete(id: string) {
    const user = await this.get(id);
    await this.userRepository.remove(user);
  }
}
