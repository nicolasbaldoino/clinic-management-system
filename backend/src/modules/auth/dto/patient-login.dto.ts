import { IsString, Matches } from 'class-validator';

export class PatientLoginDto {
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF must be exactly 11 digits' })
  cpf: string;
} 