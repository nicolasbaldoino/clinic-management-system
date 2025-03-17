import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfessionalDto {
  @ApiPropertyOptional({
    description: 'Nome completo do profissional',
    example: 'Dr. Maria Santos',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Especialidade do profissional',
    example: 'Cardiologia',
  })
  @IsString()
  @IsOptional()
  speciality?: string;

  @ApiPropertyOptional({
    description: 'Email do profissional',
    example: 'maria.santos@clinica.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nova senha do profissional (mínimo 6 caracteres)',
    example: 'novasenha123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;
} 