import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from '../db/db.service';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { TRACK_NOT_FOUND } from './constants/track.constant';
import { TrackDto } from './dto/track.dto';
@Injectable()
export class TracksService {
  constructor(private dbService: DbService) {}
  create(artist: TrackDto) {
    const id = uuidv4();

    const user = {
      id,
      ...artist,
    };
    this.dbService.trackRepository.push(user);

    return user;
  }

  update(id: string, inUser: TrackDto) {
    const artist = this.dbService.trackRepository.find(
      (user) => user.id === id,
    );
    if (!artist) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    const updatedUser = {
      ...artist,
      ...inUser,
    };

    this.dbService.trackRepository = [
      ...this.dbService.trackRepository,
      updatedUser,
    ];
    return updatedUser;
  }

  getAll() {
    return this.dbService.trackRepository;
  }

  get(id: string) {
    const index = this.dbService.trackRepository.findIndex(
      (user) => user.id === id,
    );

    if (index === -1) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    return this.dbService.trackRepository[index];
  }

  delete(id: string) {
    const index = this.dbService.trackRepository.findIndex(
      (user) => user.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }
    this.dbService.trackRepository.splice(index, 1);
  }
}
