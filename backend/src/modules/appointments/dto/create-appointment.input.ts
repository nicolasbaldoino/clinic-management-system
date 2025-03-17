import { Field, InputType } from '@nestjs/graphql';
import { AppointmentStatus } from '@prisma/client';

@InputType()
export class CreateAppointmentInput {
  @Field()
  scheduleId: string;

  @Field()
  clinicId: string;

  @Field()
  professionalId: string;

  @Field()
  patientId: string;

  @Field(() => AppointmentStatus)
  status: AppointmentStatus;
} 