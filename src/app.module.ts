import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { DbModule } from './db/db.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_CONFIG } from './app.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: APP_CONFIG.db.host,
      port: Number(APP_CONFIG.db.port),
      username: APP_CONFIG.db.username,
      password: APP_CONFIG.db.password,
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    DbModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
