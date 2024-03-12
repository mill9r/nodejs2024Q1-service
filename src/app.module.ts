import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { DbModule } from './db/db.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, DbModule, AlbumsModule, TracksModule],
  controllers: [AppController],
})
export class AppModule {}
