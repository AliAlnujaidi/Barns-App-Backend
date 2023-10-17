import { Barn } from 'src/modules/barns/entities/barn.entity';
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
import { User } from 'src/modules/users/entities/user.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public length: number;

  @Column()
  public date: Date;

  @Column()
  public price: number;

  @ManyToOne(() => Barn, (barn: Barn) => barn.coaches)
  public barn: number;

  @ManyToOne(() => User, (user: User) => user.lessons)
  public coach: User;

  @OneToMany(
    () => Appointment,
    (appointment: Appointment) => appointment.lesson,
  )
  public appointments: Appointment[];
}
