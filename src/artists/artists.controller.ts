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
  ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CustomUUIDPipe } from '../pipes/custom-uuid.filter';
import { ArtistDto } from './dto/artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly usersService: ArtistsService) {}
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
  create(@Body(ValidationPipe) body: ArtistDto) {
    return this.usersService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', CustomUUIDPipe) id: string,
    @Body(ValidationPipe) body: ArtistDto,
  ) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomUUIDPipe) id: string) {
    this.usersService.delete(id);
  }
}
