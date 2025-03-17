import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProfessionalDto {
  @ApiProperty({
    description: 'Nome completo do profissional',
    example: 'Dr. Maria Santos',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Especialidade do profissional',
    example: 'Cardiologia',
  })
  @IsString()
  @IsNotEmpty()
  speciality: string;

  @ApiProperty({
    description: 'Email do profissional',
    example: 'maria.santos@clinica.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Senha do profissional (mínimo 6 caracteres)',
    example: 'senha123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'ID da clínica',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  clinicId: string;
} 