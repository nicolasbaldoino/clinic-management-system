import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  role: UserRole;

  @Field({ nullable: true })
  @IsUUID()
  clinicId?: string;
}

@InputType()
export class UpdateUserInput {
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
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password?: string;

  @Field(() => UserRole, { nullable: true })
  @IsNotEmpty()
  role?: UserRole;
} 