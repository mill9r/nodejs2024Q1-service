import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';
@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}
  create(inUser: CreateUserDto) {
    const id = uuidv4();
    const createdAt = Date.now();
    const updatedAt = Date.now();
    const version = 1;

    const user = {
      id,
      login: inUser.login,
      createdAt,
      updatedAt,
      version,
    };
    this.dbService.userRepository.push(user);
    this.dbService.userCredentialsRepository.set(id, inUser.password);
    return user;
  }

  update(id: string, inUser: UpdatePasswordDto) {
    const user = this.dbService.userCredentialsRepository.get(id);
    if (!user) {
      throw new CustomNotFoundException('User not found');
    }
    if (user !== inUser.oldPassword) {
      throw new WrongPasswordException('Old password is incorrect');
    }

    this.dbService.userCredentialsRepository.set(id, inUser.newPassword);
    return this.get(id);
  }

  getAll() {
    return this.dbService.userRepository;
  }

  get(id: string) {
    const index = this.dbService.userRepository.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new CustomNotFoundException('User not found');
    }

    return this.dbService.userRepository[index];
  }

  delete(id: string) {
    const index = this.dbService.userRepository.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException('User not found');
    }
    this.dbService.userRepository.splice(index, 1);
    this.dbService.userCredentialsRepository.delete(id);
  }
}
