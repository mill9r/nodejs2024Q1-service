import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoriteAlbums,
  FavoriteArtists,
  FavoriteTracks,
} from './entities/favorite.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { User } from '../users/entities/user.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteTracks,
      FavoriteAlbums,
      FavoriteArtists,
      Artist,
      Album,
      User,
      Track,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
