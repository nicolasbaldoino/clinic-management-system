import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    clinicId: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        email: true,
        role: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
  }

  async findAll(adminClinicId: string) {
    return this.prisma.user.findMany({
      where: {
        clinicId: adminClinicId,
        role: UserRole.ADMIN,
      },
      select: {
        id: true,
        email: true,
        role: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        email: 'asc',
      },
    });
  }

  async findOne(id: string, adminClinicId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ensure admin can only view users from their clinic
    if (user.clinicId !== adminClinicId) {
      throw new UnauthorizedException(
        'You can only view users from your clinic',
      );
    }

    return user;
  }

  async update(
    id: string,
    data: {
      email?: string;
      password?: string;
    },
    adminClinicId: string,
  ) {
    // Check if user exists and belongs to admin's clinic
    await this.findOne(id, adminClinicId);

    const updateData = { ...data };
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        role: true,
        clinicId: true,
        clinic: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedAt: true,
      },
    });
  }

  async remove(id: string, adminClinicId: string) {
    // Check if user exists and belongs to admin's clinic
    await this.findOne(id, adminClinicId);

    await this.prisma.user.delete({
      where: { id },
    });
  }
} 