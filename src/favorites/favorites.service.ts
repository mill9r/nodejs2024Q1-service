import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CustomNotFoundException } from '../exceptions/record-not-exist.exception';
import { TRACK_NOT_FOUND } from '../tracks/constants/track.constant';
import { ALBUM_NOT_FOUND } from '../albums/constants/album.constant';
import { ARTIST_NOT_FOUND } from '../artists/constants/artist.constant';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    private dbService: DbService,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
  ) {}

  getAll() {
    return this.dbService.favorites;
  }

  addTrack(id: string) {
    const track = this.tracksService.get(id);
    this.dbService.favorites.tracks.push(track);
  }

  deleteTrack(id: string) {
    const index = this.dbService.favorites.tracks.findIndex(
      (trackId) => trackId.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(TRACK_NOT_FOUND);
    }
    this.dbService.favorites.tracks.splice(index, 1);
  }

  addAlbum(id: string) {
    const album = this.albumsService.get(id);
    this.dbService.favorites.albums.push(album);
  }

  deleteAlbum(id: string) {
    const index = this.dbService.favorites.albums.findIndex(
      (album) => album.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(ALBUM_NOT_FOUND);
    }
    this.dbService.favorites.albums.splice(index, 1);
  }

  addArtist(id: string) {
    const artist = this.artistsService.get(id);
    this.dbService.favorites.artists.push(artist);
  }

  deleteArtist(id: string) {
    const index = this.dbService.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (index === -1) {
      throw new CustomNotFoundException(ARTIST_NOT_FOUND);
    }
    this.dbService.favorites.artists.splice(index, 1);
  }
}
