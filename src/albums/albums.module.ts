import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [],
})
export class AlbumsModule {}
