import { AuthenticationService } from './authentication.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import LocalAuthGuard from '../../guards/local-auth.guard';
import JwtRefreshGuard from 'src/guards/jwt-refresh.guard';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import RequestWithUser from './dto/requestWithUser.interface';
import { Response } from 'express';
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.signUpUser(registrationData);
  }

  @Post('login')
  async logIn(@Res() response: Response, @Body() loginInfo: LoginDto) {
    const user = await this.authenticationService.authenticateUser(
      loginInfo.email,
      loginInfo.password,
    );
    response.setHeader('Set-Cookie', user.refresh_token_cookie).json(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: any) {
    const access_token = this.authenticationService.getJwtAccessToken(
      request.user.id,
    );
    request.user.access_token = access_token;
    console.log(request.user);
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    return { loggedOut: true };
  }
}
