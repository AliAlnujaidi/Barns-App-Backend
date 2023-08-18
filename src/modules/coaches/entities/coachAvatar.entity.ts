import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Coach } from './coach.entity';
import { PublicFile } from 'src/modules/publicFiles/entities/publicFile.entity';
@Entity()
export class Avatar {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  file?: PublicFile;
}
