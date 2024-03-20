import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class FavoriteArtists {
  @PrimaryColumn()
  id: string;

  // @PrimaryColumn()
  @ManyToOne(() => Artist, (artist) => artist, {
    onDelete: 'CASCADE',
  })
  artistId: Artist;

  // @PrimaryColumn()
  // @ManyToOne(() => User, (user) => user.id, {
  //   onDelete: 'CASCADE',
  // })
  // userId: string;
}

@Entity()
export class FavoriteTracks {
  @PrimaryColumn()
  id: string;

  // @PrimaryColumn()
  @ManyToOne(() => Track, (track) => track, {
    onDelete: 'CASCADE',
  })
  trackId: Track;

  // @PrimaryColumn()
  // @ManyToOne(() => User, (user) => user.id, {
  //   onDelete: 'CASCADE',
  // })
  // userId: string;
}

@Entity()
export class FavoriteAlbums {
  @PrimaryColumn()
  id: string;

  // @PrimaryColumn()
  @ManyToOne(() => Album, (album) => album, {
    onDelete: 'CASCADE',
  })
  albumId: Album;

  // @PrimaryColumn()
  // @ManyToOne(() => User, (user) => user.id, {
  //   onDelete: 'CASCADE',
  // })
  // userId: string;
}
