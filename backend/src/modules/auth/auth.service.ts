import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';
import { LoginDto } from './dto/login.dto';
import { MeResponseDto } from './dto/me.dto';
import { PatientLoginDto } from './dto/patient-login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateInternalUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      clinicId: user.clinicId || undefined,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clinicId: user.clinicId,
      },
    };
  }

  async validatePatient(patientLoginDto: PatientLoginDto) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf: patientLoginDto.cpf },
    });

    if (!patient) {
      throw new UnauthorizedException('Invalid CPF');
    }

    return {
      patient: {
        id: patient.id,
        name: patient.name,
        cpf: patient.cpf,
        email: patient.email,
        phone: patient.phone,
      },
    };
  }

  async me(user: any): Promise<MeResponseDto> {
    // It's an internal user
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      clinicId: user.clinicId,
    };
  }
}
