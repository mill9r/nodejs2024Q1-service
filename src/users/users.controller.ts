import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CustomUUIDPipe } from '../pipes/custom-uuid.filter';
import { WrongPasswordExceptionFilter } from '../exceptions/wrong-password.filter';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  get(@Param('id', CustomUUIDPipe) id: string) {
    return this.usersService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseFilters(WrongPasswordExceptionFilter)
  update(
    @Param('id', CustomUUIDPipe) id: string,
    @Body(ValidationPipe) body: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomUUIDPipe) id: string) {
    this.usersService.delete(id);
  }
}
