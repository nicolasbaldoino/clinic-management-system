import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ScheduleStatus } from '@prisma/client';
import { Clinic } from '../../clinic/models/clinic.model';
import { Professional } from '../../professional/models/professional.model';

@ObjectType()
export class Schedule {
  @Field(() => ID)
  id: string;

  @Field()
  date: Date;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => ScheduleStatus)
  status: ScheduleStatus;

  @Field(() => String)
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => String)
  professionalId: string;

  @Field(() => Professional)
  professional: Professional;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 