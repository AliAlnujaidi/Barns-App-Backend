import { AuthenticationService } from './authentication.service';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import LocalAuthGuard from '../../guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signUp(@Body() registrationData: CreateUserDto) {
    return this.authenticationService.signUpUser(registrationData);
  }

  @Post('login')
  async logIn(@Body() loginInfo: LoginDto) {
    const access_token = await this.authenticationService.authenticateUser(
      loginInfo.email,
      loginInfo.password,
    );
    return { access_token };
  }
}
