import { UserRole } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.role === UserRole.ADMIN) {
      const admin = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { clinic: true }
      });

      if (!admin) {
        throw new UnauthorizedException();
      }

      return {
        id: admin.id,
        email: admin.email,
        role: UserRole.ADMIN,
        clinicId: admin.clinicId
      };
    } else {
      const patient = await this.prisma.patient.findUnique({
        where: { id: payload.sub }
      });

      if (!patient) {
        throw new UnauthorizedException();
      }

      return {
        id: patient.id,
        cpf: patient.cpf,
        role: UserRole.PATIENT
      };
    }
  }
}
