import { Controller, Get } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}
  @Get()
  getLessons() {
    return this.service.getLessons();
  }
}
