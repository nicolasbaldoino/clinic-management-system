import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Appointment } from '../../appointments/models/appointment.model';

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 