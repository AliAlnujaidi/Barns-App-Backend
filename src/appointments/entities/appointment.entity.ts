import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  trainee: number;
  @Column()
  coach: number;
  @Column()
  duration: number;
  @Column()
  barn: number;
}