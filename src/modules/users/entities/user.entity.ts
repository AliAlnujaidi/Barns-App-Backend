import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Lesson } from 'src/modules/lessons/entities/lesson.entity';
import { Roles } from 'src/constants/roles.enum';
import { Barn } from 'src/modules/barns/entities/barn.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    default: `${Roles.TRAINEE}`,
    type: 'enum',
    enum: Roles,
    enumName: 'role',
    name: 'role',
    nullable: false,
  })
  role: Roles;

  @OneToMany(
    () => Appointment,
    (appoinment: Appointment) => appoinment.trainee,
    { nullable: true },
  )
  public appointments: Appointment[];

  @OneToMany(() => Lesson, (appoinment: Lesson) => appoinment.coach, {
    nullable: true,
  })
  public lessons: Lesson[];

  @ManyToOne(() => Barn, (barn: Barn) => barn.coaches, { nullable: true })
  public barn: Barn;
}
