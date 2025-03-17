import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { ClinicsService } from './clinics.service';

describe('ClinicsService', () => {
  let service: ClinicsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    clinic: {
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
        ClinicsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClinicsService>(ClinicsService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createClinicDto = {
      name: 'Test Clinic',
    };

    const expectedClinic = {
      id: 'clinic-123',
      name: createClinicDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a new clinic', async () => {
      mockPrismaService.clinic.create.mockResolvedValue(expectedClinic);

      const result = await service.create(createClinicDto);

      expect(mockPrismaService.clinic.create).toHaveBeenCalledWith({
        data: createClinicDto,
      });
      expect(result).toEqual(expectedClinic);
    });
  });

  describe('findAll', () => {
    const mockClinics = [
      {
        id: 'clinic-1',
        name: 'Clinic 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'clinic-2',
        name: 'Clinic 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should return all clinics', async () => {
      mockPrismaService.clinic.findMany.mockResolvedValue(mockClinics);

      const result = await service.findAll();

      expect(mockPrismaService.clinic.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockClinics);
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    const clinicId = 'clinic-123';
    const mockClinic = {
      id: clinicId,
      name: 'Test Clinic',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return a clinic if it exists', async () => {
      mockPrismaService.clinic.findUnique.mockResolvedValue(mockClinic);

      const result = await service.findOne(clinicId);

      expect(mockPrismaService.clinic.findUnique).toHaveBeenCalledWith({
        where: { id: clinicId },
      });
      expect(result).toEqual(mockClinic);
    });

    it('should throw NotFoundException when clinic not found', async () => {
      mockPrismaService.clinic.findUnique.mockResolvedValue(null);

      await expect(service.findOne(clinicId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const clinicId = 'clinic-123';
    const updateClinicDto = {
      name: 'Updated Clinic Name',
    };
    const mockClinic = {
      id: clinicId,
      name: 'Test Clinic',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedClinic = {
      ...mockClinic,
      name: updateClinicDto.name,
      updatedAt: new Date(),
    };

    it('should update a clinic if it exists', async () => {
      mockPrismaService.clinic.update.mockResolvedValue(updatedClinic);

      const result = await service.update(clinicId, updateClinicDto);

      expect(mockPrismaService.clinic.update).toHaveBeenCalledWith({
        where: { id: clinicId },
        data: updateClinicDto,
      });
      expect(result).toEqual(updatedClinic);
      expect(result.name).toBe(updateClinicDto.name);
    });

    it('should throw NotFoundException when clinic not found', async () => {
      mockPrismaService.clinic.update.mockRejectedValue(new Error());

      await expect(service.update(clinicId, updateClinicDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    const clinicId = 'clinic-123';
    const mockClinic = {
      id: clinicId,
      name: 'Test Clinic',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should delete a clinic if it exists', async () => {
      mockPrismaService.clinic.delete.mockResolvedValue(mockClinic);

      const result = await service.remove(clinicId);

      expect(mockPrismaService.clinic.delete).toHaveBeenCalledWith({
        where: { id: clinicId },
      });
      expect(result).toEqual(mockClinic);
    });

    it('should throw NotFoundException when clinic not found', async () => {
      mockPrismaService.clinic.delete.mockRejectedValue(new Error());

      await expect(service.remove(clinicId)).rejects.toThrow(NotFoundException);
    });
  });
}); 