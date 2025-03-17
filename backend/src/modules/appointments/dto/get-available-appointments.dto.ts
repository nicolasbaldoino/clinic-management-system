import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class GetAvailableAppointmentsDto {
  @ApiPropertyOptional({
    description: 'ID do profissional para filtrar horários disponíveis',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  professionalId?: string;

  @ApiPropertyOptional({
    description: 'Data para filtrar horários disponíveis',
    example: '2024-03-20',
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date?: Date;
} 