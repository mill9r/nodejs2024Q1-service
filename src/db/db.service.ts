import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class DbService {
  public userRepository: User[] = [];
  public userCredentialsRepository = new Map<string, string>();
  public artistRepository: Artist[] = [];
  public albumRepository: Album[] = [];
  public trackRepository: Track[] = [];
  public favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
