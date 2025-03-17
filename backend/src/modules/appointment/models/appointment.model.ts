import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AppointmentStatus } from '@prisma/client';
import { Clinic } from '../../clinic/models/clinic.model';
import { Patient } from '../../patient/models/patient.model';
import { Professional } from '../../professional/models/professional.model';

@ObjectType()
export class Appointment {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => AppointmentStatus)
  status: AppointmentStatus;

  @Field(() => String)
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => String)
  professionalId: string;

  @Field(() => Professional)
  professional: Professional;

  @Field(() => String)
  patientId: string;

  @Field(() => Patient)
  patient: Patient;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 