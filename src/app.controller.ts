import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import RolesGuard from './guards/role.guard';
import { Roles } from './constants/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
