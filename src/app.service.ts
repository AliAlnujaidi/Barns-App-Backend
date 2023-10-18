import { Injectable } from '@nestjs/common';

import { Roles } from './constants/roles.enum';
import { RolesGuards } from './decorators/roles.decorator';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJS API';
  }
}
