import { Module, UseFilters } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { CustomNotFoundExceptionFilter } from '../exceptions/record-not-exist.filter';
import { WrongPasswordExceptionFilter } from '../exceptions/wrong-password.filter';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [],
})
@UseFilters(
  new CustomNotFoundExceptionFilter(),
  new WrongPasswordExceptionFilter(),
)
export class AlbumsModule {}
