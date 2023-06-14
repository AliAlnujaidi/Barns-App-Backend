import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  private appointments: Appointment[] = [
    {
        id: 1,
        trainee: "Ali",
        coach: 'Ahmed',
        duration: 3
    }
    ];
}
