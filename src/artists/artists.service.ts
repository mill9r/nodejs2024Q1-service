import { Injectable } from '@nestjs/common';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { ArtistDto } from './dto/artist.dto';
import { ARTIST_NOT_FOUND } from './constants/artist.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async create(artist: ArtistDto) {
    const createdArtist = this.artistRepository.create(artist);

    return this.artistRepository.save(createdArtist);
  }

  async update(id: string, inUser: ArtistDto) {
    const artist = await this.artistRepository.preload({
      id,
      ...inUser,
    });
    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }
    return this.artistRepository.save(artist);
  }

  async getAll() {
    return this.artistRepository.find();
  }

  async get(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async delete(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }

    return this.artistRepository.delete(id);
  }
}
