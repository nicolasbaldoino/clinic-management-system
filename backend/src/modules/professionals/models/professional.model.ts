import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../../appointments/models/appointment.model';
import { Clinic } from '../../clinics/models/clinic.model';
import { Schedule } from '../../schedules/models/schedule.model';

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

  password: string;

  @Field()
  clinicId: string;

  @Field(() => Clinic)
  clinic: Clinic;

  @Field(() => [Schedule], { nullable: true })
  schedules?: Schedule[];

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 