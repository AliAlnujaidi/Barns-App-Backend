import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './constants/roles.enum';
import { RolesGuards } from './decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RolesGuards([Roles.TRAINEE])
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
