import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    description: 'ID do profissional',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  professionalId: string;

  @ApiProperty({
    description: 'Data do agendamento',
    example: '2024-03-20',
  })
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty({
    description: 'Horário de início no formato HH:mm',
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in format HH:mm',
  })
  startTime: string;

  @ApiProperty({
    description: 'Horário de término no formato HH:mm',
    example: '10:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in format HH:mm',
  })
  endTime: string;
} 