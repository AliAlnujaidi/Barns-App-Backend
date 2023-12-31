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
import { Roles } from 'src/constants/roles.enum';
import RolesGuard from 'src/guards/role.guard';
import { RolesGuards } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RolesGuards([Roles.ADMIN])
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string, @Request() req) {
    return this.usersService.getUserById(+id);
  }
}
