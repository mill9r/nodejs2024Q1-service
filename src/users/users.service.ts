import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { WrongPasswordException } from '../exceptions/wrong-password.exception';
import { USER_NOT_FOUND } from './constants/constants';
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
      throw new CustomNotFoundException(USER_NOT_FOUND);
    }
    if (user !== inUser.oldPassword) {
      throw new WrongPasswordException('Old password is incorrect');
    }

    this.dbService.userRepository.forEach((i) => {
      if (i.id === id) {
        i.updatedAt = Date.now();
        i.version++;
      }
    });
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
      throw new CustomNotFoundException(USER_NOT_FOUND);
    }

    return this.dbService.userRepository[index];
  }

  delete(id: string) {
    const index = this.dbService.userRepository.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(USER_NOT_FOUND);
    }
    this.dbService.userRepository.splice(index, 1);
    this.dbService.userCredentialsRepository.delete(id);
  }
}
