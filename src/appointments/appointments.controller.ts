import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
//@UseInterceptors(ClassSerializerInterceptor)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  @Get()
  getAppointments() {
    const date: Date = new Date();
    return this.appointmentsService.findAll();
  }

  @Get('/coach/:id')
  getCoachAppointments(@Param('id') user: string) {
    return this.appointmentsService.findCoachAppointments(+user);
  }

  @Get('/trainee/:id')
  getTraineeAppointments(@Param('id') user: string) {
    return this.appointmentsService.findTraineeAppointments(+user);
  }

  @Post('create')
  async createAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(body);
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
