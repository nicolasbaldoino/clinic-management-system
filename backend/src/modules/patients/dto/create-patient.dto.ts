import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'Nome completo do paciente',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CPF do paciente no formato XXX.XXX.XXX-XX',
    example: '123.456.789-00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF must be in format XXX.XXX.XXX-XX',
  })
  cpf: string;

  @ApiProperty({
    description: 'Email do paciente',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Telefone do paciente no formato (XX) XXXXX-XXXX',
    example: '(11) 98765-4321',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'Phone must be in format (XX) XXXXX-XXXX',
  })
  phone: string;
} 