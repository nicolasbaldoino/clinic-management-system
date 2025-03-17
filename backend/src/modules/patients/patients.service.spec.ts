import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    patient: {
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
        PatientsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createPatientDto = {
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john@example.com',
      phone: '1234567890',
    };

    const expectedPatient = {
      id: 'patient-123',
      ...createPatientDto,
      createdAt: new Date(),
    };

    it('should create a new patient', async () => {
      mockPrismaService.patient.create.mockResolvedValue(expectedPatient);

      const result = await service.create(createPatientDto);

      expect(mockPrismaService.patient.create).toHaveBeenCalledWith({
        data: createPatientDto,
        select: {
          id: true,
          name: true,
          cpf: true,
          email: true,
          phone: true,
          createdAt: true,
        },
      });
      expect(result).toEqual(expectedPatient);
    });
  });

  describe('findAll', () => {
    const mockPatients = [
      {
        id: 'patient-1',
        name: 'John Doe',
        cpf: '12345678900',
        email: 'john@example.com',
        phone: '1234567890',
        createdAt: new Date(),
        _count: {
          appointments: 2,
        },
      },
    ];

    it('should return all patients with appointment count', async () => {
      mockPrismaService.patient.findMany.mockResolvedValue(mockPatients);

      const result = await service.findAll();

      expect(mockPrismaService.patient.findMany).toHaveBeenCalledWith({
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
      expect(result).toEqual(mockPatients);
    });
  });

  describe('findOne', () => {
    const patientId = 'patient-123';
    const mockPatient = {
      id: patientId,
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john@example.com',
      phone: '1234567890',
      appointments: [
        {
          id: 'appointment-1',
          schedule: {
            date: new Date(),
            startTime: '09:00',
          },
          professional: {
            id: 'prof-1',
            name: 'Dr. Smith',
            speciality: 'Cardiology',
          },
          clinic: {
            id: 'clinic-1',
            name: 'Heart Clinic',
          },
        },
      ],
    };

    it('should return a patient with appointments if it exists', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);

      const result = await service.findOne(patientId);

      expect(mockPrismaService.patient.findUnique).toHaveBeenCalledWith({
        where: { id: patientId },
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
      expect(result).toEqual(mockPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(service.findOne(patientId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCpf', () => {
    const patientCpf = '12345678900';
    const mockPatient = {
      id: 'patient-123',
      name: 'John Doe',
      cpf: patientCpf,
      email: 'john@example.com',
      phone: '1234567890',
      appointments: [],
    };

    it('should return a patient if CPF exists', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);

      const result = await service.findByCpf(patientCpf);

      expect(mockPrismaService.patient.findUnique).toHaveBeenCalledWith({
        where: { cpf: patientCpf },
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
      expect(result).toEqual(mockPatient);
    });

    it('should throw NotFoundException when CPF not found', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(service.findByCpf(patientCpf)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const patientId = 'patient-123';
    const updatePatientDto = {
      name: 'John Doe Jr.',
      email: 'john.jr@example.com',
      phone: '0987654321',
    };
    const mockPatient = {
      id: patientId,
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john@example.com',
      phone: '1234567890',
    };
    const updatedPatient = {
      ...mockPatient,
      ...updatePatientDto,
      updatedAt: new Date(),
    };

    beforeEach(() => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockPrismaService.patient.update.mockResolvedValue(updatedPatient);
    });

    it('should update a patient if it exists', async () => {
      const result = await service.update(patientId, updatePatientDto);

      expect(mockPrismaService.patient.update).toHaveBeenCalledWith({
        where: { id: patientId },
        data: updatePatientDto,
        select: {
          id: true,
          name: true,
          cpf: true,
          email: true,
          phone: true,
          updatedAt: true,
        },
      });
      expect(result).toEqual(updatedPatient);
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(
        service.update(patientId, updatePatientDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    const patientId = 'patient-123';
    const mockPatient = {
      id: patientId,
      name: 'John Doe',
      cpf: '12345678900',
    };

    beforeEach(() => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockPrismaService.patient.delete.mockResolvedValue(mockPatient);
    });

    it('should delete a patient if it exists', async () => {
      await service.remove(patientId);

      expect(mockPrismaService.patient.delete).toHaveBeenCalledWith({
        where: { id: patientId },
      });
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(service.remove(patientId)).rejects.toThrow(NotFoundException);
    });
  });
}); 