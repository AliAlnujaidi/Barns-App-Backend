import { Exclude } from 'class-transformer';
import { Barn } from 'src/barns/entities/barn.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PublicFile {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @Exclude()
  @Column()
  public key: string;

  @Column({nullable: true})
  public url: string;


  @ManyToOne(() => Barn, (barn: Barn) => barn.photos)
  @Exclude()
  @Column()
  barn: number;
}
