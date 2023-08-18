import { Barn } from 'src/modules/barns/entities/barn.entity';
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

  @ManyToOne(() => User, (trainee: User) => trainee.lessons, { eager: true })
  @Column()
  trainee: number;

  @ManyToOne(() => User, (coach: User) => coach.appointments, { eager: true })
  @Column()
  coach: number;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  tysognihfpfognfsfpog: string;

  @ManyToOne(() => Barn, (barn: Barn) => barn.appointments, { eager: true })
  @Column()
  barn: number;
}
