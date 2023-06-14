import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  @Get()
  getAppointments() {
    return {
      Appointment: "1",
      Appointment2: "2"
    }
  }
  @Get(':coach')
  getCoachAppointments(@Param('coach') coach: string) {
    return `these are all the appointments for ${coach}`;
  }
  @Post('create')
  createAppointment(@Body() body) {
    return body;
  }
  @Patch('update/:id')
  updateAppointment(@Param('id') id: string, @Body() Body) {
    return `appointment ${id} for ${Body.name} updated`;
  }

  @Delete('cancel/:id')
  deleteAppointment(@Param('id') id: string) {
    return `appointment ${id} canceled`;
}
}
