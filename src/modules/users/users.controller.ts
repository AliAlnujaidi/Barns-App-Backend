import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuards } from 'src/decorators/roles.decorator';
import { Roles } from 'src/constants/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string, @Request() req) {
    return this.usersService.getUserById(+id);
  }
}
