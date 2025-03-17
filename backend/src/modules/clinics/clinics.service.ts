import { Injectable, NotFoundException } from '@nestjs/common';
import { Clinic } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string }): Promise<Clinic> {
    return this.prisma.clinic.create({
      data,
    });
  }

  async findAll(): Promise<Clinic[]> {
    return this.prisma.clinic.findMany();
  }

  async findOne(id: string): Promise<Clinic> {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
    });

    if (!clinic) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }

    return clinic;
  }

  async update(id: string, data: { name: string }): Promise<Clinic> {
    try {
      return await this.prisma.clinic.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<Clinic> {
    try {
      return await this.prisma.clinic.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }
}
