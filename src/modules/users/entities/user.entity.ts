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
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { Roles } from 'src/constants/roles.enum';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({
    default: `${Roles.TRAINEE}`,
    type: 'enum',
    enum: Roles,
    enumName: 'role',
    name: 'role',
    nullable: false,
  })
  role: Roles;

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
  public lessons: Lesson[];
}
