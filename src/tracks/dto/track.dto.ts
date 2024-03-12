import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  artistId: string | null;

  @IsString()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
