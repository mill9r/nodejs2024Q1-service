import { Injectable } from '@nestjs/common';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { TRACK_NOT_FOUND } from '../tracks/constants/track.constant';
import { ALBUM_NOT_FOUND } from '../albums/constants/album.constant';
import { ARTIST_NOT_FOUND } from '../artists/constants/artist.constant';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteArtists)
    private favoriteArtistsRepository: Repository<FavoriteArtists>,
    @InjectRepository(FavoriteTracks)
    private favoriteTracksRepository: Repository<FavoriteTracks>,
    @InjectRepository(FavoriteAlbums)
    private favoriteAlbumsRepository: Repository<FavoriteAlbums>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
    @InjectRepository(Album) private albumRepository: Repository<Album>,
  ) {}

  async getAll() {
    const tracks = await this.favoriteTracksRepository.find({
      relations: ['trackId'],
    });
    const artists = await this.favoriteArtistsRepository.find({
      relations: ['artistId'],
    });
    const albums = await this.favoriteAlbumsRepository.find({
      relations: ['albumId'],
    });

    return {
      artists: artists.map((artist) => artist.artistId),
      tracks: tracks.map((track) => track.trackId),
      albums: albums.map((album) => album.albumId),
    };
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }

    const favoriteTrack = this.favoriteTracksRepository.create({
      id,
      trackId: track,
    });

    return this.favoriteTracksRepository.save(favoriteTrack);
  }

  async deleteTrack(id: string) {
    console.log('deleteTrack', id);
    const track = await this.favoriteTracksRepository.findOne({
      where: { id },
    });
    if (!track) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }
    return this.favoriteTracksRepository.delete({ id });
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }

    const favoriteAlbum = this.favoriteAlbumsRepository.create({
      id,
      albumId: album,
    });

    return this.favoriteAlbumsRepository.save(favoriteAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }
    return this.favoriteAlbumsRepository.delete({ id });
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }

    const favoriteArtist = this.favoriteArtistsRepository.create({
      id,
      artistId: artist,
    });

    return this.favoriteArtistsRepository.save(favoriteArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { artistId: id },
    });
    if (!artist) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }
    return this.favoriteArtistsRepository.delete({ id });
  }
}
