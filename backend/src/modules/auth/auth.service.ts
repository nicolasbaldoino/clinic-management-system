import { UserRole } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.user.findFirst({
      where: { 
        email,
        role: UserRole.ADMIN
      },
      include: {
        clinic: true
      }
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async validatePatient(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf }
    });

    if (!patient) {
      throw new UnauthorizedException('Patient not found');
    }

    return patient;
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: UserRole.ADMIN,
      clinicId: admin.clinicId
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: admin.id,
        email: admin.email,
        clinicId: admin.clinicId,
        clinicName: admin.clinic?.name
      }
    };
  }

  async patientLogin(cpf: string) {
    const patient = await this.validatePatient(cpf);

    const payload = {
      sub: patient.id,
      cpf: patient.cpf,
      role: UserRole.PATIENT
    };

    return {
      access_token: this.jwtService.sign(payload),
      patient: {
        id: patient.id,
        name: patient.name,
        cpf: patient.cpf
      }
    };
  }

  async me(user: { id: string; role: UserRole }) {
    if (user.role === UserRole.ADMIN) {
      const admin = await this.prisma.user.findUnique({
        where: { id: user.id },
        include: { clinic: true }
      });

      if (!admin) {
        throw new UnauthorizedException();
      }

      return {
        id: admin.id,
        email: admin.email,
        role: UserRole.ADMIN,
        clinicId: admin.clinicId,
        clinicName: admin.clinic?.name
      };
    } else {
      const patient = await this.prisma.patient.findUnique({
        where: { id: user.id }
      });

      if (!patient) {
        throw new UnauthorizedException();
      }

      return {
        id: patient.id,
        name: patient.name,
        cpf: patient.cpf,
        role: UserRole.PATIENT
      };
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
