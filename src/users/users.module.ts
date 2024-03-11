import { Module, UseFilters } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CustomNotFoundExceptionFilter } from '../exceptions/record-not-exist.filter';
import { WrongPasswordExceptionFilter } from '../exceptions/wrong-password.filter';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
@UseFilters(
  new CustomNotFoundExceptionFilter(),
  new WrongPasswordExceptionFilter(),
)
export class UsersModule {}
