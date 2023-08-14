import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Barn } from './barn.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class BarnPhoto {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => PublicFile, {
        eager: true,
        cascade: true
    })
    @JoinColumn()
    public file: PublicFile;

    @ManyToOne(() => Barn, (barn: Barn) => barn.photos)
    @Exclude()
    @Column()
    barn: number;
}
