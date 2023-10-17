import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

import { PublicFile } from 'src/modules/publicFiles/entities/publicFile.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BarnPhoto } from './barnPhoto.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity()
export class Barn {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => BarnPhoto, (barnPhoto: BarnPhoto) => barnPhoto.barn, {
    eager: true,
    nullable: true,
  })
  public photos: BarnPhoto[];

  @Column({ nullable: true })
  rate: number;

  // @OneToMany(() => Coach, (coach: Coach) => coach.barn, { eager: true, nullable: true })
  // public coachesTable: Coach[];

  @OneToMany(() => User, (coach: User) => coach.barn, {
    eager: true,
    nullable: true,
  })
  public coaches: User[];
}
