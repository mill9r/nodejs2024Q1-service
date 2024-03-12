import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { DbModule } from '../db/db.module';
import { TracksController } from './tracks.controller';

@Module({
  imports: [DbModule],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
