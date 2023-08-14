import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Coach } from 'src/coaches/entities/coach.entity';
import { PublicFile } from 'src/publicFiles/entities/publicFile.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BarnPhoto } from './barnPhoto.entity';

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

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Appointment, (appoinment: Appointment) => appoinment.barn)
  public appointments: Appointment[];

  @OneToMany(() => BarnPhoto, (barnPhoto: BarnPhoto) => barnPhoto.barn, {
    eager: true,
    nullable: true,
  })
  public photos: BarnPhoto[];

  @OneToMany(() => Coach, (coach: Coach) => coach.barn, { eager: true })
  public coaches: Coach[];
}
