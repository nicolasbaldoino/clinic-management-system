import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

class AdminLoginDto {
  @ApiProperty({
    description: 'Email do usuário administrador',
    example: 'admin@clinica.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

class PatientLoginDto {
  @ApiProperty({
    description: 'CPF do paciente no formato XXX.XXX.XXX-XX',
    example: '123.456.789-00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF must be in format XXX.XXX.XXX-XX',
  })
  cpf: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @ApiOperation({ summary: 'Login de administrador' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async adminLogin(@Body() { email, password }: AdminLoginDto) {
    return this.authService.adminLogin(email, password);
  }

  @Post('patient/login')
  @ApiOperation({ summary: 'Login de paciente' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'CPF inválido ou não encontrado' })
  async patientLogin(@Body() { cpf }: PatientLoginDto) {
    return this.authService.patientLogin(cpf);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Realizar logout' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async logout() {
    return { message: 'Logout realizado com sucesso' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async me(@Request() req) {
    return this.authService.me(req.user);
  }
} 