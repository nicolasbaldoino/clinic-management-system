import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentStatus, ScheduleStatus } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { AppointmentsService } from './appointments.service';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    schedule: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    patient: {
      findUnique: jest.fn(),
    },
    appointment: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    prismaService = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('getAvailableAppointments', () => {
    const mockSchedules = [
      {
        id: 'schedule-1',
        date: new Date('2024-03-20'),
        startTime: '09:00',
        endTime: '10:00',
        status: ScheduleStatus.AVAILABLE,
        professional: {
          id: 'prof-1',
          name: 'Dr. Smith',
          speciality: 'Cardiology',
          clinic: {
            id: 'clinic-1',
            name: 'Heart Clinic',
          },
        },
      },
    ];

    it('should return available appointments', async () => {
      mockPrismaService.schedule.findMany.mockResolvedValue(mockSchedules);

      const result = await service.getAvailableAppointments();

      expect(mockPrismaService.schedule.findMany).toHaveBeenCalledWith({
        where: { status: ScheduleStatus.AVAILABLE },
        include: {
          professional: {
            select: {
              id: true,
              name: true,
              speciality: true,
              clinic: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: [
          { date: 'asc' },
          { startTime: 'asc' },
        ],
      });
      expect(result).toHaveLength(1);
      expect(result[0].professional.name).toBe('Dr. Smith');
    });

    it('should filter by professional and date', async () => {
      const professionalId = 'prof-1';
      const date = new Date('2024-03-20');
      mockPrismaService.schedule.findMany.mockResolvedValue(mockSchedules);

      await service.getAvailableAppointments(professionalId, date);

      expect(mockPrismaService.schedule.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            status: ScheduleStatus.AVAILABLE,
            professionalId,
            date: {
              gte: expect.any(Date),
              lt: expect.any(Date),
            },
          },
        }),
      );
    });
  });

  describe('bookAppointment', () => {
    const scheduleId = 'schedule-1';
    const patientCpf = '12345678900';
    const mockSchedule = {
      id: scheduleId,
      date: new Date('2024-03-20'),
      startTime: '09:00',
      status: ScheduleStatus.AVAILABLE,
      professionalId: 'prof-1',
      professional: {
        id: 'prof-1',
        clinicId: 'clinic-1',
      },
      appointment: null,
    };
    const mockPatient = {
      id: 'patient-1',
      cpf: patientCpf,
    };

    it('should successfully book an appointment', async () => {
      mockPrismaService.schedule.findUnique.mockResolvedValue(mockSchedule);
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockPrismaService.appointment.findFirst.mockResolvedValue(null);
      const mockCreatedAppointment = {
        id: 'appointment-1',
        status: AppointmentStatus.SCHEDULED,
      };
      mockPrismaService.appointment.create.mockResolvedValue(mockCreatedAppointment);

      const result = await service.bookAppointment(scheduleId, patientCpf);

      expect(mockPrismaService.schedule.update).toHaveBeenCalledWith({
        where: { id: scheduleId },
        data: { status: ScheduleStatus.BOOKED },
      });
      expect(mockPrismaService.appointment.create).toHaveBeenCalledWith({
        data: {
          scheduleId,
          status: AppointmentStatus.SCHEDULED,
          clinicId: mockSchedule.professional.clinicId,
          professionalId: mockSchedule.professionalId,
          patientId: mockPatient.id,
        },
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
      });
      expect(result).toEqual(mockCreatedAppointment);
    });

    it('should throw NotFoundException when schedule not found', async () => {
      mockPrismaService.schedule.findUnique.mockResolvedValue(null);

      await expect(service.bookAppointment(scheduleId, patientCpf)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when schedule is not available', async () => {
      mockPrismaService.schedule.findUnique.mockResolvedValue({
        ...mockSchedule,
        status: ScheduleStatus.BOOKED,
      });

      await expect(service.bookAppointment(scheduleId, patientCpf)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPrismaService.schedule.findUnique.mockResolvedValue(mockSchedule);
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(service.bookAppointment(scheduleId, patientCpf)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when patient has conflicting appointment', async () => {
      mockPrismaService.schedule.findUnique.mockResolvedValue(mockSchedule);
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockPrismaService.appointment.findFirst.mockResolvedValue({
        id: 'existing-appointment',
      });

      await expect(service.bookAppointment(scheduleId, patientCpf)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getPatientAppointments', () => {
    const patientCpf = '12345678900';
    const mockPatient = {
      id: 'patient-1',
      cpf: patientCpf,
    };
    const mockAppointments = [
      {
        id: 'appointment-1',
        schedule: {
          date: new Date('2024-03-20'),
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
    ];

    it('should return patient appointments', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(mockPatient);
      mockPrismaService.appointment.findMany.mockResolvedValue(mockAppointments);

      const result = await service.getPatientAppointments(patientCpf);

      expect(mockPrismaService.appointment.findMany).toHaveBeenCalledWith({
        where: {
          patientId: mockPatient.id,
        },
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
      });
      expect(result).toEqual(mockAppointments);
    });

    it('should throw NotFoundException when patient not found', async () => {
      mockPrismaService.patient.findUnique.mockResolvedValue(null);

      await expect(service.getPatientAppointments(patientCpf)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('CRUD operations', () => {
    const mockAppointment = {
      id: 'appointment-1',
      schedule: {},
      clinic: {},
      professional: {},
      patient: {},
    };

    it('should create an appointment', async () => {
      const createDto = {
        scheduleId: 'schedule-1',
        patientId: 'patient-1',
        clinicId: 'clinic-1',
        professionalId: 'prof-1',
        status: AppointmentStatus.SCHEDULED,
      };
      mockPrismaService.appointment.create.mockResolvedValue(mockAppointment);

      const result = await service.create(createDto);

      expect(mockPrismaService.appointment.create).toHaveBeenCalledWith({
        data: createDto,
        include: {
          schedule: true,
          clinic: true,
          professional: true,
          patient: true,
        },
      });
      expect(result).toEqual(mockAppointment);
    });

    it('should find all appointments', async () => {
      mockPrismaService.appointment.findMany.mockResolvedValue([mockAppointment]);

      const result = await service.findAll();

      expect(mockPrismaService.appointment.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockAppointment);
    });

    it('should find one appointment', async () => {
      const id = 'appointment-1';
      mockPrismaService.appointment.findUnique.mockResolvedValue(mockAppointment);

      const result = await service.findOne(id);

      expect(mockPrismaService.appointment.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: {
          schedule: true,
          clinic: true,
          professional: true,
          patient: true,
        },
      });
      expect(result).toEqual(mockAppointment);
    });

    it('should throw NotFoundException when appointment not found', async () => {
      const id = 'non-existent';
      mockPrismaService.appointment.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });

    it('should update an appointment', async () => {
      const id = 'appointment-1';
      const updateDto = {
        id,
        status: AppointmentStatus.CONFIRMED,
      };
      const updatedAppointment = { ...mockAppointment, status: AppointmentStatus.CONFIRMED };
      mockPrismaService.appointment.update.mockResolvedValue(updatedAppointment);

      const result = await service.update(id, updateDto);

      expect(mockPrismaService.appointment.update).toHaveBeenCalledWith({
        where: { id },
        data: { status: AppointmentStatus.CONFIRMED },
        include: {
          schedule: true,
          clinic: true,
          professional: true,
          patient: true,
        },
      });
      expect(result).toEqual(updatedAppointment);
    });
  });
}); 