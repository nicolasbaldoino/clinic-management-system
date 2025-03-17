import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';
import { ProfessionalsService } from './professionals.service';

jest.mock('bcryptjs');

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    professional: {
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
        ProfessionalsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createProfessionalDto = {
      name: 'Dr. Smith',
      speciality: 'Cardiology',
      clinicId: 'clinic-123',
      email: 'dr.smith@example.com',
      password: 'password123',
    };

    const adminClinicId = 'clinic-123';
    const hashedPassword = 'hashedPassword123';
    const expectedProfessional = {
      id: 'prof-123',
      name: createProfessionalDto.name,
      speciality: createProfessionalDto.speciality,
      email: createProfessionalDto.email,
      clinic: {
        id: createProfessionalDto.clinicId,
        name: 'Test Clinic',
      },
    };

    beforeEach(() => {
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.professional.create.mockResolvedValue(expectedProfessional);
    });

    it('should create a new professional with hashed password', async () => {
      const result = await service.create(createProfessionalDto, adminClinicId);

      expect(bcrypt.hash).toHaveBeenCalledWith(createProfessionalDto.password, 10);
      expect(mockPrismaService.professional.create).toHaveBeenCalledWith({
        data: {
          ...createProfessionalDto,
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
      expect(result).toEqual(expectedProfessional);
    });

    it('should throw UnauthorizedException when admin tries to create professional for different clinic', async () => {
      const differentClinicId = 'different-clinic';

      await expect(
        service.create(createProfessionalDto, differentClinicId),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    const clinicId = 'clinic-123';
    const mockProfessionals = [
      {
        id: 'prof-1',
        name: 'Dr. Smith',
        speciality: 'Cardiology',
        email: 'dr.smith@example.com',
        clinic: {
          id: clinicId,
          name: 'Test Clinic',
        },
      },
    ];

    it('should return all professionals from the specified clinic', async () => {
      mockPrismaService.professional.findMany.mockResolvedValue(mockProfessionals);

      const result = await service.findAll(clinicId);

      expect(mockPrismaService.professional.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual(mockProfessionals);
    });
  });

  describe('findOne', () => {
    const professionalId = 'prof-123';
    const clinicId = 'clinic-123';
    const mockProfessional = {
      id: professionalId,
      name: 'Dr. Smith',
      speciality: 'Cardiology',
      email: 'dr.smith@example.com',
      clinicId: clinicId,
      clinic: {
        id: clinicId,
        name: 'Test Clinic',
      },
    };

    it('should return a professional if it exists and belongs to the clinic', async () => {
      mockPrismaService.professional.findUnique.mockResolvedValue(mockProfessional);

      const result = await service.findOne(professionalId, clinicId);

      expect(mockPrismaService.professional.findUnique).toHaveBeenCalledWith({
        where: { id: professionalId },
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
      expect(result).toEqual(mockProfessional);
    });

    it('should throw NotFoundException when professional not found', async () => {
      mockPrismaService.professional.findUnique.mockResolvedValue(null);

      await expect(service.findOne(professionalId, clinicId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException when professional belongs to different clinic', async () => {
      const differentClinicProfessional = {
        ...mockProfessional,
        clinicId: 'different-clinic',
      };
      mockPrismaService.professional.findUnique.mockResolvedValue(
        differentClinicProfessional,
      );

      await expect(service.findOne(professionalId, clinicId)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('update', () => {
    const professionalId = 'prof-123';
    const clinicId = 'clinic-123';
    const updateProfessionalDto = {
      name: 'Dr. Smith Jr.',
      email: 'dr.smith.jr@example.com',
      password: 'newpassword123',
    };
    const hashedPassword = 'newhashedpassword123';
    const mockProfessional = {
      id: professionalId,
      name: 'Dr. Smith',
      speciality: 'Cardiology',
      email: 'dr.smith@example.com',
      clinicId: clinicId,
      clinic: {
        id: clinicId,
        name: 'Test Clinic',
      },
    };

    beforeEach(() => {
      mockPrismaService.professional.findUnique.mockResolvedValue(mockProfessional);
      mockPrismaService.professional.update.mockResolvedValue({
        ...mockProfessional,
        name: updateProfessionalDto.name,
        email: updateProfessionalDto.email,
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    });

    it('should update professional if it exists and belongs to clinic', async () => {
      const result = await service.update(
        professionalId,
        updateProfessionalDto,
        clinicId,
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(updateProfessionalDto.password, 10);
      expect(mockPrismaService.professional.update).toHaveBeenCalledWith({
        where: { id: professionalId },
        data: {
          name: updateProfessionalDto.name,
          email: updateProfessionalDto.email,
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
      expect(result.name).toBe(updateProfessionalDto.name);
      expect(result.email).toBe(updateProfessionalDto.email);
    });

    it('should throw NotFoundException when professional not found', async () => {
      mockPrismaService.professional.findUnique.mockResolvedValue(null);

      await expect(
        service.update(professionalId, updateProfessionalDto, clinicId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    const professionalId = 'prof-123';
    const clinicId = 'clinic-123';
    const mockProfessional = {
      id: professionalId,
      clinicId: clinicId,
    };

    beforeEach(() => {
      mockPrismaService.professional.findUnique.mockResolvedValue(mockProfessional);
      mockPrismaService.professional.delete.mockResolvedValue(mockProfessional);
    });

    it('should delete professional if it exists and belongs to clinic', async () => {
      await service.remove(professionalId, clinicId);

      expect(mockPrismaService.professional.delete).toHaveBeenCalledWith({
        where: { id: professionalId },
      });
    });

    it('should throw NotFoundException when professional not found', async () => {
      mockPrismaService.professional.findUnique.mockResolvedValue(null);

      await expect(service.remove(professionalId, clinicId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
}); 