import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { PatientLoginDto } from './dto/patient-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateInternalUser(loginDto);
  }

  @Public()
  @Post('patient/login')
  async patientLogin(@Body() patientLoginDto: PatientLoginDto) {
    return this.authService.validatePatient(patientLoginDto);
  }

  @Get('me')
  async me(@CurrentUser() user: any) {
    return this.authService.me(user);
  }
}
