import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class DbService {
  public userRepository: User[] = [];
  public userCredentialsRepository = new Map<string, string>();
  public artistRepository: Artist[] = [];
}
