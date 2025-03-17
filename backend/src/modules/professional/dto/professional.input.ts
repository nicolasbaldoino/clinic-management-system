import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateProfessionalInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  speciality: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  clinicId: string;
}

@InputType()
export class UpdateProfessionalInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  speciality?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  email?: string;
} 