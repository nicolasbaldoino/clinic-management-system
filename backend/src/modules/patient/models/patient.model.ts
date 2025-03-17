import { Field, ID, ObjectType } from '@nestjs/graphql';

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
} 