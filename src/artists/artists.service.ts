import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { ArtistDto } from './dto/artist.dto';
import { ARTIST_NOT_FOUND } from './constants/artist.constant';
@Injectable()
export class ArtistsService {
  constructor(private dbService: DbService) {}
  create(artist: ArtistDto) {
    const id = uuidv4();

    const user = {
      id,
      ...artist,
    };
    this.dbService.artistRepository.push(user);

    return user;
  }

  update(id: string, inUser: ArtistDto) {
    const artist = this.dbService.artistRepository.find(
      (user) => user.id === id,
    );
    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }

    const updatedUser = {
      ...artist,
      ...inUser,
    };

    this.dbService.artistRepository = [
      ...this.dbService.artistRepository,
      updatedUser,
    ];
    return updatedUser;
  }

  getAll() {
    console.log('this.dbService', this.dbService);
    return this.dbService.artistRepository;
  }

  get(id: string) {
    const index = this.dbService.artistRepository.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }

    return this.dbService.artistRepository[index];
  }

  delete(id: string) {
    const index = this.dbService.artistRepository.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }
    this.dbService.artistRepository.splice(index, 1);
  }
}
