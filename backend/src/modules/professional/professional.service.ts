import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessionalInput, UpdateProfessionalInput } from './dto/professional.input';

@Injectable()
export class ProfessionalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfessionalInput: CreateProfessionalInput) {
    return this.prisma.professional.create({
      data: createProfessionalInput,
      include: {
        clinic: true,
        schedules: true,
        appointments: {
          include: {
            patient: true,
            schedule: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.professional.findMany({
      include: {
        clinic: true,
        schedules: true,
        appointments: {
          include: {
            patient: true,
            schedule: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      include: {
        clinic: true,
        schedules: true,
        appointments: {
          include: {
            patient: true,
            schedule: true,
          },
        },
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return professional;
  }

  async findByClinic(clinicId: string) {
    return this.prisma.professional.findMany({
      where: { clinicId },
      include: {
        clinic: true,
        schedules: true,
        appointments: {
          include: {
            patient: true,
            schedule: true,
          },
        },
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

  async update(id: string, updateProfessionalInput: UpdateProfessionalInput) {
    try {
      return await this.prisma.professional.update({
        where: { id },
        data: updateProfessionalInput,
        include: {
          clinic: true,
          schedules: true,
          appointments: {
            include: {
              patient: true,
              schedule: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.professional.delete({
        where: { id },
        include: {
          clinic: true,
          schedules: true,
          appointments: {
            include: {
              patient: true,
              schedule: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }
  }
} 