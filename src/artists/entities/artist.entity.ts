import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: string;
}
