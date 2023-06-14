import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) { }
  findAll() {
    return this.appointmentRepository.find();
  }

  findCoachAppointments(coach: number) {
  }

  async createAppointment(appointment: CreateAppointmentDto) {
    const newAppointment = await this.appointmentRepository.create(appointment);
    await this.appointmentRepository.save(newAppointment);
    return "newAppointment";
  }
}
