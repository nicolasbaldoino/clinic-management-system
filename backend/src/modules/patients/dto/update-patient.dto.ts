import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class UpdatePatientDto {
  @ApiPropertyOptional({
    description: 'Nome completo do paciente',
    example: 'João da Silva',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Email do paciente',
    example: 'joao.silva@email.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Telefone do paciente no formato (XX) XXXXX-XXXX',
    example: '(11) 98765-4321',
  })
  @IsString()
  @IsOptional()
  @Matches(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: 'Phone must be in format (XX) XXXXX-XXXX',
  })
  phone?: string;
} 