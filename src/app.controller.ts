import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './constants/roles.enum';
import { RolesGuards } from './decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @RolesGuards([Roles.TRAINEE])
  getHello(): string {
    return this.appService.getHello();
  }
}
