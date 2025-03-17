import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { Clinic } from '../../clinics/models/clinic.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field({ nullable: true })
  clinicId?: string;

  @Field(() => Clinic, { nullable: true })
  clinic?: Clinic;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 