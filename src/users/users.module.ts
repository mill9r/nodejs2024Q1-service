import { Module, UseFilters } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DbService } from '../db/db.service';
import { CustomNotFoundExceptionFilter } from '../exceptions/record-not-exist.filter';
import { WrongPasswordExceptionFilter } from '../exceptions/wrong-password.filter';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DbService],
  exports: [DbService],
})
@UseFilters(
  new CustomNotFoundExceptionFilter(),
  new WrongPasswordExceptionFilter(),
)
export class UsersModule {}
