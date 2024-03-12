import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Injectable()
export class DbService {
  public userRepository: User[] = [];
  public userCredentialsRepository = new Map<string, string>();
  public artistRepository: Artist[] = [];
  public albumRepository: Album[] = [];
  public trackRepository: Track[] = [];
  public favorites = {
    // artists: Artist[],
    // albums: Album[]: [],
    // tracks: Track[]: []
  };
}
