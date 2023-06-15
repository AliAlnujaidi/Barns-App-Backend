import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Barn {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    name: string;
    @Column({nullable:true})
    location: string;
    @Column({nullable:true})
    phone: string

    @OneToMany(() => Appointment, (appoinment: Appointment) => appoinment.barn)
    public appointments: Appointment[];
}
