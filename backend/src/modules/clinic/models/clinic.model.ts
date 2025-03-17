import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../../appointment/models/appointment.model';
import { Professional } from '../../professional/models/professional.model';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Clinic {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  users: User[];

  @Field(() => [Professional])
  professionals: Professional[];

  @Field(() => [Appointment])
  appointments: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 