import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.artistId, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  artistId: string;

  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  albumId: string;

  @Column()
  duration: number;
}
