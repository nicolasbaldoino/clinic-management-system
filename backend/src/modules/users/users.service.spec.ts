import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';
import { UsersService } from './users.service';

jest.mock('bcryptjs');

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
      clinicId: 'clinic-123',
    };

    const hashedPassword = 'hashedPassword123';
    const expectedUser = {
      id: 'user-123',
      email: createUserDto.email,
      role: UserRole.ADMIN,
      clinicId: createUserDto.clinicId,
      clinic: {
        id: 'clinic-123',
        name: 'Test Clinic',
      },
      createdAt: new Date(),
    };

    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.user.create.mockResolvedValue(expectedUser);
    });

    it('should create a new user with hashed password', async () => {
      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
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
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    const adminClinicId = 'clinic-123';
    const mockUsers = [
      {
        id: 'user-1',
        email: 'user1@example.com',
        role: UserRole.ADMIN,
        clinicId: adminClinicId,
        clinic: { id: adminClinicId, name: 'Test Clinic' },
        createdAt: new Date(),
      },
    ];

    it('should return all users from the specified clinic', async () => {
      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll(adminClinicId);

      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    const userId = 'user-123';
    const adminClinicId = 'clinic-123';
    const mockUser = {
      id: userId,
      email: 'test@example.com',
      role: UserRole.ADMIN,
      clinicId: adminClinicId,
      clinic: { id: adminClinicId, name: 'Test Clinic' },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return a user if it exists and belongs to the admin clinic', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(userId, adminClinicId);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(userId, adminClinicId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if user belongs to different clinic', async () => {
      const differentClinicUser = { ...mockUser, clinicId: 'different-clinic' };
      mockPrismaService.user.findUnique.mockResolvedValue(differentClinicUser);

      await expect(service.findOne(userId, adminClinicId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    const userId = 'user-123';
    const adminClinicId = 'clinic-123';
    const updateUserDto = {
      email: 'updated@example.com',
      password: 'newpassword123',
    };
    const hashedPassword = 'newhashedpassword123';
    const mockUser = {
      id: userId,
      email: 'test@example.com',
      role: UserRole.ADMIN,
      clinicId: adminClinicId,
      clinic: { id: adminClinicId, name: 'Test Clinic' },
      updatedAt: new Date(),
    };

    beforeEach(() => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        email: updateUserDto.email,
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    });

    it('should update user if it exists and belongs to admin clinic', async () => {
      const result = await service.update(userId, updateUserDto, adminClinicId);

      expect(bcrypt.hash).toHaveBeenCalledWith(updateUserDto.password, 10);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          email: updateUserDto.email,
          password: hashedPassword,
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
          updatedAt: true,
        },
      });
      expect(result.email).toBe(updateUserDto.email);
    });
  });

  describe('remove', () => {
    const userId = 'user-123';
    const adminClinicId = 'clinic-123';
    const mockUser = {
      id: userId,
      clinicId: adminClinicId,
    };

    beforeEach(() => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.delete.mockResolvedValue(mockUser);
    });

    it('should delete user if it exists and belongs to admin clinic', async () => {
      await service.remove(userId, adminClinicId);

      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.remove(userId, adminClinicId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
}); 