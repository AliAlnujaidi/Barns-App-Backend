import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ nullable: true, default: 'trainee' })
  role: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Appointment, (appoinment: Appointment) => appoinment.coach)
  public appointments: Appointment[];

  @OneToMany(() => Appointment, (appoinment: Appointment) => appoinment.trainee)
  public lessons: Appointment[];
}
