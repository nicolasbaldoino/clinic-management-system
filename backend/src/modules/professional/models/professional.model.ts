import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  @Field(() => String)
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => [Schedule])
  schedules: Schedule[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 