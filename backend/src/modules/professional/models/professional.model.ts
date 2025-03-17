import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../../appointment/models/appointment.model';
import { Clinic } from '../../clinic/models/clinic.model';
import { Schedule } from '../../schedule/models/schedule.model';

@ObjectType()
export class Professional {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  speciality: string;

  @Field()
  email: string;

  @Field(() => ID)
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => [Schedule])
  schedules: Schedule[];

  @Field(() => [Appointment])
  appointments: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 