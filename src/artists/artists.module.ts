import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [],
})
export class ArtistsModule {}
