import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfessionalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.professional.findMany({
      include: {
        clinic: true,
        schedules: true,
      },
    });
  }

  async findOne(id: string) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      include: {
        clinic: true,
        schedules: true,
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return professional;
  }

  async findByClinic(clinicId: string) {
    return this.prisma.professional.findMany({
      where: {
        clinicId,
      },
      include: {
        clinic: true,
        schedules: true,
      },
    });
  }

  async findBySpeciality(speciality: string, clinicId: string) {
    return this.prisma.professional.findMany({
      where: {
        speciality,
        clinicId,
      },
      include: {
        clinic: true,
        schedules: true,
      },
    });
  }
} 