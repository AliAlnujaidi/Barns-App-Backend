import { Barn } from 'src/barns/entities/barn.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';
import { Coach } from './coach.entity';
@Entity()
export class Avatar {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => PublicFile, {
        eager: true,
        nullable: true
    })
    @JoinColumn()
    file?: PublicFile;

}
