import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
      },
      include: {
        clinic: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        clinic: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        clinic: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        clinic: true,
      },
    });
  }

  async findByClinic(clinicId: string) {
    return this.prisma.user.findMany({
      where: { clinicId },
      include: {
        clinic: true,
      },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      if (updateUserInput.password) {
        updateUserInput.password = await bcrypt.hash(updateUserInput.password, 10);
      }

      return this.prisma.user.update({
        where: { id },
        data: updateUserInput,
        include: {
          clinic: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
} 