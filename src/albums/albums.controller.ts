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
import { AlbumsService } from './albums.service';
import { CustomUUIDPipe } from '../pipes/custom-uuid.filter';
import { AlbumDto } from './dto/album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  get(@Param('id', CustomUUIDPipe) id: string) {
    return this.albumsService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) body: AlbumDto) {
    return this.albumsService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', CustomUUIDPipe) id: string,
    @Body(ValidationPipe) body: AlbumDto,
  ) {
    return this.albumsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomUUIDPipe) id: string) {
    this.albumsService.delete(id);
  }
}
