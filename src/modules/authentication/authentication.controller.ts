import { AuthenticationService } from './authentication.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LoginDto } from './dto/login.dto';
import { ExtractJwt } from 'passport-jwt';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }


  @HttpCode(200)
  @Post('login')
  async logIn(@Body() loginInfo: LoginDto) {
    const user = this.authenticationService.getAuthenticatedUser(loginInfo.email, loginInfo.password);
    const access_token = this.authenticationService.getCookieWithJwtToken((await user).id);
    return { access_token };
  }
}