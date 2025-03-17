import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { Clinic } from '../../clinic/models/clinic.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field(() => String, { nullable: true })
  clinicId?: string;

  @Field(() => Clinic, { nullable: true })
  clinic?: Clinic;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 