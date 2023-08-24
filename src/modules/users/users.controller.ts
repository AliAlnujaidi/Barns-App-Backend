import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(+id);
  }
  @Post('login')
  loginUser(@Body() user: LoginUserDto) {
    return this.usersService.loginUser(user);
  }
}
