import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    professionalId: string;
    date: Date;
    startTime: string;
    endTime: string;
  }, adminClinicId: string) {
    // Check if professional belongs to admin's clinic
    const professional = await this.prisma.professional.findUnique({
      where: { id: data.professionalId },
      select: { clinicId: true },
    });

    if (!professional) {
      throw new NotFoundException('Professional not found');
    }

    if (professional.clinicId !== adminClinicId) {
      throw new UnauthorizedException(
        'You can only create schedules for professionals in your clinic',
      );
    }

    return this.prisma.schedule.create({
      data: {
        ...data,
        status: ScheduleStatus.AVAILABLE,
      },
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            speciality: true,
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(adminClinicId: string) {
    return this.prisma.schedule.findMany({
      where: {
        professional: {
          clinicId: adminClinicId,
        },
      },
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            speciality: true,
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findOne(id: string, adminClinicId: string) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            speciality: true,
            clinicId: true,
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    if (schedule.professional.clinicId !== adminClinicId) {
      throw new UnauthorizedException(
        'You can only view schedules from your clinic',
      );
    }

    return schedule;
  }

  async update(
    id: string,
    data: {
      date?: Date;
      startTime?: string;
      endTime?: string;
      status?: ScheduleStatus;
    },
    adminClinicId: string,
  ) {
    // Check if schedule exists and belongs to admin's clinic
    await this.findOne(id, adminClinicId);

    return this.prisma.schedule.update({
      where: { id },
      data,
      include: {
        professional: {
          select: {
            id: true,
            name: true,
            speciality: true,
            clinic: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async remove(id: string, adminClinicId: string) {
    // Check if schedule exists and belongs to admin's clinic
    await this.findOne(id, adminClinicId);

    await this.prisma.schedule.delete({
      where: { id },
    });
  }
} 