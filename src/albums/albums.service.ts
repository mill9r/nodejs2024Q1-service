import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { AlbumDto } from './dto/album.dto';
import { ALBUM_NOT_FOUND } from './constants/album.constant';
@Injectable()
export class AlbumsService {
  constructor(private dbService: DbService) {}
  create(artist: AlbumDto) {
    const id = uuidv4();

    const user = {
      id,
      ...artist,
    };
    this.dbService.albumRepository.push(user);

    return user;
  }

  update(id: string, inUser: AlbumDto) {
    const artist = this.dbService.albumRepository.find(
      (user) => user.id === id,
    );
    if (!artist) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    const updatedUser = {
      ...artist,
      ...inUser,
    };

    this.dbService.albumRepository = [
      ...this.dbService.albumRepository,
      updatedUser,
    ];
    return updatedUser;
  }

  getAll() {
    return this.dbService.albumRepository;
  }

  get(id: string) {
    const index = this.dbService.albumRepository.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    return this.dbService.albumRepository[index];
  }

  delete(id: string) {
    const index = this.dbService.albumRepository.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }
    this.dbService.albumRepository.splice(index, 1);
  }
}
