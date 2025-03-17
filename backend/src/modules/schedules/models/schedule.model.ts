import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ScheduleStatus } from '@prisma/client';
import { Appointment } from '../../appointments/models/appointment.model';
import { Professional } from '../../professionals/models/professional.model';

@ObjectType()
export class Schedule {
  @Field(() => ID)
  id: string;

  @Field()
  professionalId: string;

  @Field(() => Professional)
  professional: Professional;

  @Field()
  date: Date;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => ScheduleStatus)
  status: ScheduleStatus;

  @Field(() => Appointment, { nullable: true })
  appointment?: Appointment;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 