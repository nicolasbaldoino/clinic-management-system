import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Appointment, AppointmentStatus, ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment as AppointmentModel } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToModel(appointment: Appointment & {
    schedule: any;
    clinic: any;
    professional: any;
    patient: any;
  }): AppointmentModel {
    return {
      ...appointment,
      schedule: appointment.schedule,
      clinic: appointment.clinic,
      professional: appointment.professional,
      patient: appointment.patient,
    };
  }

  async getAvailableAppointments(professionalId?: string, date?: Date) {
    const where = {
      status: ScheduleStatus.AVAILABLE,
      ...(professionalId && { professionalId }),
      ...(date && {
        date: {
          gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
      }),
    };

    const schedules = await this.prisma.schedule.findMany({
      where,
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
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ],
    });

    return schedules.map((schedule) => ({
      id: schedule.id,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      professional: schedule.professional,
    }));
  }

  async bookAppointment(scheduleId: string, patientCpf: string): Promise<Appointment> {
    // Check if schedule exists and is available
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: {
        professional: true,
        appointment: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    if (schedule.status !== ScheduleStatus.AVAILABLE) {
      throw new BadRequestException('This schedule is not available');
    }

    if (schedule.appointment) {
      throw new BadRequestException('This schedule is already booked');
    }

    // Get patient by CPF
    const patient = await this.prisma.patient.findUnique({
      where: { cpf: patientCpf },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    // Check if patient already has an appointment at the same time
    const existingAppointment = await this.prisma.appointment.findFirst({
      where: {
        patientId: patient.id,
        schedule: {
          date: schedule.date,
          startTime: schedule.startTime,
        },
        status: {
          in: [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED],
        },
      },
    });

    if (existingAppointment) {
      throw new BadRequestException('Patient already has an appointment at this time');
    }

    // Use transaction to ensure data consistency
    return this.prisma.$transaction(async (tx) => {
      // Update schedule status
      await tx.schedule.update({
        where: { id: scheduleId },
        data: { status: ScheduleStatus.BOOKED },
      });

      // Create appointment
      return tx.appointment.create({
        data: {
          scheduleId,
          status: AppointmentStatus.SCHEDULED,
          clinicId: schedule.professional.clinicId,
          professionalId: schedule.professionalId,
          patientId: patient.id,
        },
        include: {
          schedule: true,
          professional: {
            select: {
              id: true,
              name: true,
              speciality: true,
            },
          },
          clinic: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    });
  }

  async getPatientAppointments(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.prisma.appointment.findMany({
      where: {
        patientId: patient.id,
      },
      include: {
        schedule: true,
        professional: {
          select: {
            id: true,
            name: true,
            speciality: true,
          },
        },
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        schedule: {
          date: 'desc',
        },
      },
    });
  }

  async create(createAppointmentInput: CreateAppointmentInput): Promise<AppointmentModel> {
    const appointment = await this.prisma.appointment.create({
      data: createAppointmentInput,
      include: {
        schedule: true,
        clinic: true,
        professional: true,
        patient: true,
      },
    });
    return this.mapToModel(appointment);
  }

  async findAll(): Promise<AppointmentModel[]> {
    const appointments = await this.prisma.appointment.findMany({
      include: {
        schedule: true,
        clinic: true,
        professional: true,
        patient: true,
      },
    });
    return appointments.map(this.mapToModel);
  }

  async findOne(id: string): Promise<AppointmentModel> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        schedule: true,
        clinic: true,
        professional: true,
        patient: true,
      },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return this.mapToModel(appointment);
  }

  async update(id: string, updateAppointmentInput: UpdateAppointmentInput): Promise<AppointmentModel> {
    const { id: _, ...data } = updateAppointmentInput;
    const appointment = await this.prisma.appointment.update({
      where: { id },
      data,
      include: {
        schedule: true,
        clinic: true,
        professional: true,
        patient: true,
      },
    });
    return this.mapToModel(appointment);
  }

  async remove(id: string): Promise<AppointmentModel> {
    const appointment = await this.prisma.appointment.delete({
      where: { id },
      include: {
        schedule: true,
        clinic: true,
        professional: true,
        patient: true,
      },
    });
    return this.mapToModel(appointment);
  }
} 