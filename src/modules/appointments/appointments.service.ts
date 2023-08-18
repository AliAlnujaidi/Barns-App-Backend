import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}
  findAll() {
    return this.appointmentRepository.find();
  }

  findUserAppointments(id: number, role: string) {
    if (!role || (role != 'coach' && role != 'trainee')) {
      return 'role is invalid';
    }
    if (role == 'coach') {
      return this.appointmentRepository.findBy({ coach: id });
    }
    if (role == 'trainee') {
      return this.appointmentRepository.findBy({ trainee: id });
    }
  }

  async createAppointment(appointment: CreateAppointmentDto) {
    const newAppointment = await this.appointmentRepository.create(appointment);
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
