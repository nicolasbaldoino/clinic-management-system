import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePatientInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone: string;
}

@InputType()
export class UpdatePatientInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Field({ nullable: true })
  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone?: string;
} 