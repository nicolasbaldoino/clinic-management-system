import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  scheduleId: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;
} 