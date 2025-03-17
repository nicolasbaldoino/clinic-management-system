import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Clinic as PrismaClinic } from '@prisma/client';
import { Appointment } from '../../appointments/models/appointment.model';
import { Professional } from '../../professionals/models/professional.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Clinic implements Partial<PrismaClinic> {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  users?: User[];

  @Field(() => [Professional])
  professionals?: Professional[];

  @Field(() => [Appointment])
  appointments?: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
