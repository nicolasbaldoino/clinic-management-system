import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicInput, UpdateClinicInput } from './dto/clinic.input';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async create(createClinicInput: CreateClinicInput) {
    return this.prisma.clinic.create({
      data: createClinicInput,
      include: {
        users: true,
        professionals: true,
        appointments: true,
      },
    });
  }

  async findAll() {
    return this.prisma.clinic.findMany({
      include: {
        users: true,
        professionals: true,
        appointments: true,
      },
    });
  }

  async findOne(id: string) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      include: {
        users: true,
        professionals: true,
        appointments: true,
      },
    });

    if (!clinic) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }

    return clinic;
  }

  async update(id: string, updateClinicInput: UpdateClinicInput) {
    try {
      return await this.prisma.clinic.update({
        where: { id },
        data: updateClinicInput,
        include: {
          users: true,
          professionals: true,
          appointments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.clinic.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }
} 