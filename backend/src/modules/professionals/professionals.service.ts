import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ProfessionalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    speciality: string;
    clinicId: string;
    email: string;
    password: string;
  }, adminClinicId: string) {
    // Ensure admin can only create professionals for their clinic
    if (adminClinicId !== data.clinicId) {
      throw new UnauthorizedException('You can only create professionals for your clinic');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.professional.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        speciality: true,
        email: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(clinicId: string) {
    return this.prisma.professional.findMany({
      where: {
        clinicId,
      },
      select: {
        id: true,
        name: true,
        speciality: true,
        email: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string, clinicId: string) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        speciality: true,
        email: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!professional) {
      throw new NotFoundException('Professional not found');
    }

    // Ensure admin can only view professionals from their clinic
    if (professional.clinicId !== clinicId) {
      throw new UnauthorizedException('You can only view professionals from your clinic');
    }

    return professional;
  }

  async update(
    id: string,
    data: {
      name?: string;
      speciality?: string;
      email?: string;
      password?: string;
    },
    clinicId: string,
  ) {
    // Check if professional exists and belongs to the clinic
    await this.findOne(id, clinicId);

    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.professional.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        speciality: true,
        email: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: string, clinicId: string) {
    // Check if professional exists and belongs to the clinic
    await this.findOne(id, clinicId);

    await this.prisma.professional.delete({
      where: { id },
    });
  }
} 