import { Injectable } from '@nestjs/common';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { TRACK_NOT_FOUND } from './constants/track.constant';
import { TrackDto } from './dto/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { Repository } from 'typeorm';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  async create(track: TrackDto) {
    const album = await this.albumRepository.findOne({
      where: { id: track.albumId },
    });
    const artist = await this.artistRepository.findOne({
      where: { artistId: track.artistId },
    });

    const createdTrack = this.trackRepository.create({
      ...track,
      albumId: album.id,
      artistId: artist.artistId,
    });

    return this.trackRepository.save(createdTrack);
  }

  async update(id: string, inUser: TrackDto) {
    const track = await this.trackRepository.preload({ id, ...inUser });
    if (!track) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    return this.trackRepository.save(track);
  }

  async getAll() {
    return this.trackRepository.find({
      relations: ['albumId', 'artistId'],
    });
  }

  async get(id: string) {
    const track = this.trackRepository.findOne({
      where: { id },
      relations: ['albumId', 'artistId'],
    });

    if (!track) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    return track;
  }

  async delete(id: string) {
    const track = this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    return this.trackRepository.delete(id);
  }
}
