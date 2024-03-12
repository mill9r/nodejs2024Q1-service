import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CustomUUIDPipe } from '../pipes/custom-uuid.filter';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly tracksService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.tracksService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', CustomUUIDPipe) id: string) {
    return this.tracksService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', CustomUUIDPipe) id: string) {
    this.tracksService.deleteTrack(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', CustomUUIDPipe) id: string) {
    return this.tracksService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', CustomUUIDPipe) id: string) {
    this.tracksService.deleteArtist(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', CustomUUIDPipe) id: string) {
    return this.tracksService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', CustomUUIDPipe) id: string) {
    this.tracksService.deleteAlbum(id);
  }
}
