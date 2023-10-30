import { Injectable } from '@nestjs/common';
import { Roles } from './constants/roles.enum';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJS API';
  }
}
