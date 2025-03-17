import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsUUID()
  @IsNotEmpty()
  scheduleId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
} 