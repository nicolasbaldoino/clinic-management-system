import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AppointmentStatus } from '@prisma/client';
import { Clinic } from '../../clinics/models/clinic.model';
import { Patient } from '../../patients/models/patient.model';
import { Professional } from '../../professionals/models/professional.model';
import { Schedule } from '../../schedules/models/schedule.model';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: string;

  @Field()
  scheduleId: string;

  @Field(() => Schedule)
  schedule: Schedule;

  @Field(() => AppointmentStatus)
  status: AppointmentStatus;

  @Field()
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field()
  professionalId: string;

  @Field(() => Professional)
  professional: Professional;

  @Field()
  patientId: string;

  @Field(() => Patient)
  patient: Patient;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 