import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateClinicInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
