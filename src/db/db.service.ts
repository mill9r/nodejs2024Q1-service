import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DbService {
  public userRepository: User[] = [];
  public userCredentialsRepository = new Map<string, string>();
}
