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
@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public length: number;

  @Column()
  public date: Date;

  @ManyToOne(() => Barn, (barn: Barn) => barn.coaches)
  public barn: number;

  @OneToMany(() => User, (user: User) => user.lessons)
  public trainees: User[];

  @OneToOne(() => User, (user: User) => user.lessons)
  @JoinColumn()
  public coach: User;
}
