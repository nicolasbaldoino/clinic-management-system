import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookAppointmentDto {
  @ApiProperty({
    description: 'ID do horário agendado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  scheduleId: string;

  @ApiProperty({
    description: 'CPF do paciente no formato XXX.XXX.XXX-XX',
    example: '123.456.789-00',
  })
  @IsString()
  @IsNotEmpty()
  patientCpf: string;
} 