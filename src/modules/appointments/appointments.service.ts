import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
@Injectable()
export class AppointmentsService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  findUserAppointments(id: number) {
    return this.appointmentRepository.findBy({ trainee: id });
  }

  async createAppointment(appointment: CreateAppointmentDto) {
    const newAppointment = this.appointmentRepository.create(appointment);
    await this.appointmentRepository.save(newAppointment);
    return newAppointment;
  }

  async deleteAppointment(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) return 'appointment dows not exists';

    await this.appointmentRepository.delete(id);
    return 'appointment canceled';
  }
}
