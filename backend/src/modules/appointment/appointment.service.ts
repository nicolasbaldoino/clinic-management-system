import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async findByClinic(clinicId: string) {
    return this.prisma.appointment.findMany({
      where: {
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.appointment.findMany({
      where: {
        patientId,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });
  }

  async findByProfessional(professionalId: string, clinicId: string) {
    return this.prisma.appointment.findMany({
      where: {
        professionalId,
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });
  }

  async findByStatus(status: AppointmentStatus, clinicId: string) {
    return this.prisma.appointment.findMany({
      where: {
        status,
        clinicId,
      },
      include: {
        clinic: true,
        professional: true,
        patient: true,
      },
    });
  }
} 