import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

@InputType()
export class CreateScheduleInput {
  @Field()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'startTime must be in HH:mm format',
  })
  startTime: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime must be in HH:mm format',
  })
  endTime: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  clinicId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  professionalId: string;
}

@InputType()
export class UpdateScheduleInput {
  @Field({ nullable: true })
  @IsDateString()
  @IsNotEmpty()
  date?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'startTime must be in HH:mm format',
  })
  startTime?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime must be in HH:mm format',
  })
  endTime?: string;
} 