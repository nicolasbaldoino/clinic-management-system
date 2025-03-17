import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleInput, UpdateScheduleInput } from './dto/schedule.input';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createScheduleInput: CreateScheduleInput) {
    return this.prisma.schedule.create({
      data: createScheduleInput,
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany({
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  async findByClinic(clinicId: string) {
    return this.prisma.schedule.findMany({
      where: { clinicId },
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
  }

  async findByProfessional(professionalId: string, clinicId: string) {
    return this.prisma.schedule.findMany({
      where: {
        professionalId,
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
  }

  async findByDate(date: Date, clinicId: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.schedule.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
        appointment: {
          include: {
            patient: true,
          },
        },
      },
    });
  }

  async findAvailable(clinicId: string, professionalId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.prisma.schedule.findMany({
      where: {
        clinicId,
        professionalId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: ScheduleStatus.AVAILABLE,
      },
      include: {
        clinic: true,
        professional: true,
      },
    });
  }

  async findByStatus(status: ScheduleStatus, clinicId: string) {
    return this.prisma.schedule.findMany({
      where: {
        status,
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
      },
    });
  }

  async update(id: string, updateScheduleInput: UpdateScheduleInput) {
    try {
      return await this.prisma.schedule.update({
        where: { id },
        data: updateScheduleInput,
        include: {
          clinic: true,
          professional: true,
          appointment: {
            include: {
              patient: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.schedule.delete({
        where: { id },
        include: {
          clinic: true,
          professional: true,
          appointment: {
            include: {
              patient: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }
} 