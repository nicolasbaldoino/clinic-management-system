import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { AppointmentsService } from './appointments.service';
import { BookAppointmentDto } from './dto/book-appointment.dto';
import { GetAvailableAppointmentsDto } from './dto/get-available-appointments.dto';

@ApiTags('Consultas')
@Controller('appointments')
@ApiBearerAuth()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('available')
  @ApiOperation({ summary: 'Listar horários disponíveis para agendamento' })
  @ApiResponse({ status: 200, description: 'Lista de horários disponíveis retornada com sucesso' })
  @ApiResponse({ status: 400, description: 'Parâmetros de consulta inválidos' })
  async getAvailableAppointments(@Query() query: GetAvailableAppointmentsDto) {
    return this.appointmentsService.getAvailableAppointments(
      query.professionalId,
      query.date,
    );
  }

  @Post('book')
  @UseGuards(AuthGuard)
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Agendar consulta' })
  @ApiResponse({ status: 201, description: 'Consulta agendada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Horário não encontrado' })
  async bookAppointment(@Body() bookAppointmentDto: BookAppointmentDto) {
    return this.appointmentsService.bookAppointment(
      bookAppointmentDto.scheduleId,
      bookAppointmentDto.patientCpf,
    );
  }

  @Get(':cpf')
  @UseGuards(AuthGuard)
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Listar consultas do paciente' })
  @ApiResponse({ status: 200, description: 'Lista de consultas retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  async getPatientAppointments(@Param('cpf') cpf: string) {
    return this.appointmentsService.getPatientAppointments(cpf);
  }
} 