import { Module, UseFilters } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { CustomNotFoundExceptionFilter } from '../exceptions/record-not-exist.filter';
import { WrongPasswordExceptionFilter } from '../exceptions/wrong-password.filter';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [],
})
@UseFilters(
  new CustomNotFoundExceptionFilter(),
  new WrongPasswordExceptionFilter(),
)
export class ArtistsModule {}
