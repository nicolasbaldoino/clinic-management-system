import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientInput, UpdatePatientInput } from './dto/patient.input';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPatientInput: CreatePatientInput) {
    return this.prisma.patient.create({
      data: createPatientInput,
      include: {
        appointments: {
          include: {
            clinic: true,
            professional: true,
            schedule: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: {
          include: {
            clinic: true,
            professional: true,
            schedule: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
          include: {
            clinic: true,
            professional: true,
            schedule: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async findByCpf(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
      include: {
        appointments: {
          include: {
            clinic: true,
            professional: true,
            schedule: true,
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${cpf} not found`);
    }

    return patient;
  }

  async update(id: string, updatePatientInput: UpdatePatientInput) {
    try {
      return await this.prisma.patient.update({
        where: { id },
        data: updatePatientInput,
        include: {
          appointments: {
            include: {
              clinic: true,
              professional: true,
              schedule: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.patient.delete({
        where: { id },
        include: {
          appointments: {
            include: {
              clinic: true,
              professional: true,
              schedule: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
} 