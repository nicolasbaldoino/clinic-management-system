import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    cpf: string;
    email: string;
    phone: string;
  }) {
    return this.prisma.patient.create({
      data,
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        phone: true,
        createdAt: true,
        _count: {
          select: {
            appointments: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: {
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
        },
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async findByCpf(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
      include: {
        appointments: {
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
        },
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(
    id: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
    },
  ) {
    await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        cpf: true,
        email: true,
        phone: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.patient.delete({ where: { id } });
  }
} 