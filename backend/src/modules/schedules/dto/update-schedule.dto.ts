import { ApiPropertyOptional } from '@nestjs/swagger';
import { ScheduleStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateScheduleDto {
  @ApiPropertyOptional({
    description: 'Data do agendamento',
    example: '2024-03-20',
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  date?: Date;

  @ApiPropertyOptional({
    description: 'Horário de início no formato HH:mm',
    example: '09:00',
  })
  @IsString()
  @IsOptional()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in format HH:mm',
  })
  startTime?: string;

  @ApiPropertyOptional({
    description: 'Horário de término no formato HH:mm',
    example: '10:00',
  })
  @IsString()
  @IsOptional()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in format HH:mm',
  })
  endTime?: string;

  @ApiPropertyOptional({
    description: 'Status do agendamento',
    example: 'AVAILABLE',
    enum: ScheduleStatus,
  })
  @IsEnum(ScheduleStatus)
  @IsOptional()
  status?: ScheduleStatus;
} 