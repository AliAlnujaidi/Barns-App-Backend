import { AppointmentStatus } from 'src/constants/appointments.enum';
import { Barn } from 'src/modules/barns/entities/barn.entity';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    default: `${AppointmentStatus.PENDING}`,
    type: 'enum',
    enum: AppointmentStatus,
    enumName: 'status',
    name: 'status',
    nullable: false,
  })
  public status: AppointmentStatus;

  @ManyToOne(() => User, (user: User) => user.appointments, { eager: true })
  @Column()
  public trainee: number;

  @ManyToOne(() => Lesson, (lesson: Lesson) => lesson.appointments)
  public lesson: Lesson;
}
