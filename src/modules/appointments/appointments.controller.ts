import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  @Get()
  getAppointments() {
    return this.appointmentsService.findAll();
  }

  @Get('/getUserAppointments/:id')
  getUserAppointments(@Param('id') id: string) {
    return this.appointmentsService.findUserAppointments(+id);
  }

  //@UseGuards(JwtAuthenticationGuard)
  @Post('createAppointment')
  async createAppointment(@Body() body: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(body);
  }

  // @Patch('update/:id')
  // updateAppointment(@Param('id') id: string, @Body() Body) {
  //   return `appointment ${id} for ${Body.name} updated`;
  // }

  @Delete('cancel/:id')
  deleteAppointment(@Param('id') id: string) {
    return this.appointmentsService.deleteAppointment(+id);
  }
}
