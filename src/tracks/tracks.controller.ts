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

import { CustomUUIDPipe } from '../pipes/custom-uuid.filter';
import { TracksService } from './tracks.service';
import { TrackDto } from './dto/track.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  get(@Param('id', CustomUUIDPipe) id: string) {
    return this.tracksService.get(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) body: TrackDto) {
    return this.tracksService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', CustomUUIDPipe) id: string,
    @Body(ValidationPipe) body: TrackDto,
  ) {
    return this.tracksService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', CustomUUIDPipe) id: string) {
    this.tracksService.delete(id);
  }
}
