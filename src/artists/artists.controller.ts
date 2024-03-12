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

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  get(@Param('id', CustomUUIDPipe) id: string) {
    return this.artistsService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) body: ArtistDto) {
    return this.artistsService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', CustomUUIDPipe) id: string,
    @Body(ValidationPipe) body: ArtistDto,
  ) {
    return this.artistsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomUUIDPipe) id: string) {
    this.artistsService.delete(id);
  }
}
