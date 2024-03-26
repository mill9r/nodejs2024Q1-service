import { Injectable } from '@nestjs/common';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { AlbumDto } from './dto/album.dto';
import { ALBUM_NOT_FOUND } from './constants/album.constant';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artists/entities/artist.entity';
@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  private async preloadArtistById(id: string): Promise<Artist> {
    return await this.artistRepository.findOne({
      where: { artistId: id },
    });
  }

  async create(album: AlbumDto) {
    const artist = await this.preloadArtistById(album.artistId);
    const createdAlbum = this.albumRepository.create({
      ...album,
      artistId: artist.artistId,
    });

    return this.albumRepository.save(createdAlbum);
  }

  async update(id: string, album: AlbumDto) {
    const artist = await this.preloadArtistById(album.artistId);
    const existingAlbum = await this.albumRepository.findOne({ where: { id } });

    if (!existingAlbum) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    const updatedAlbum = this.albumRepository.merge(existingAlbum, {
      ...album,
      artistId: artist.artistId,
    });

    return this.albumRepository.save(updatedAlbum);
  }

  async getAll() {
    return this.albumRepository.find({ relations: ['artistId'] });
  }

  async get(id: string) {
    const album = this.albumRepository.findOne({
      where: { id },
      relations: ['artistId'],
    });

    if (!album) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    return album;
  }

  async delete(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    return this.albumRepository.delete(album);
  }
}
