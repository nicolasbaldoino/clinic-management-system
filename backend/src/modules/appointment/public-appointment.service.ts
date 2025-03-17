import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentStatus, ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';

@Injectable()
export class PublicAppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAvailableSchedules(clinicId: string, professionalId: string, date: Date) {
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
        professional: true,
      },
    });
  }

  async createAppointment(input: CreateAppointmentInput) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf: input.cpf },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${input.cpf} not found`);
    }

    const schedule = await this.prisma.schedule.findUnique({
      where: { id: input.scheduleId },
      include: {
        professional: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${input.scheduleId} not found`);
    }

    if (schedule.status !== ScheduleStatus.AVAILABLE) {
      throw new BadRequestException('This schedule is not available');
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        scheduleId: input.scheduleId,
        status: AppointmentStatus.SCHEDULED,
        clinicId: schedule.professional.clinicId,
        professionalId: schedule.professionalId,
        patientId: patient.id,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
        schedule: true,
      },
    });

    await this.prisma.schedule.update({
      where: { id: input.scheduleId },
      data: { status: ScheduleStatus.BOOKED },
    });

    return appointment;
  }

  async findPatientAppointments(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${cpf} not found`);
    }

    return this.prisma.appointment.findMany({
      where: {
        patientId: patient.id,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
        schedule: true,
      },
      orderBy: {
        schedule: {
          date: 'asc',
        },
      },
    });
  }

  async cancelAppointment(cpf: string, appointmentId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${cpf} not found`);
    }

    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        schedule: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${appointmentId} not found`);
    }

    if (appointment.patientId !== patient.id) {
      throw new BadRequestException('This appointment does not belong to this patient');
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.CANCELLED },
      include: {
        clinic: true,
        professional: true,
        patient: true,
        schedule: true,
      },
    });

    await this.prisma.schedule.update({
      where: { id: appointment.scheduleId },
      data: { status: ScheduleStatus.AVAILABLE },
    });

    return updatedAppointment;
  }
} 