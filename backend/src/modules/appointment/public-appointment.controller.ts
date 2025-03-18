import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { PublicAppointmentService } from './public-appointment.service';

@Controller('public/appointments')
export class PublicAppointmentController {
  constructor(private readonly publicAppointmentService: PublicAppointmentService) {}

  @Public()
  @Get('available-schedules')
  async findAvailableSchedules(
    @Query('clinicId') clinicId: string,
    @Query('professionalId') professionalId: string,
    @Query('date') date: string,
  ) {
    return this.publicAppointmentService.findAvailableSchedules(
      clinicId,
      professionalId,
      new Date(date),
    );
  }

  @Public()
  @Post()
  async createAppointment(@Body() input: CreateAppointmentDto) {
    const appointmentInput: CreateAppointmentInput = {
      ...input,
      date: new Date(input.date),
    };
    return this.publicAppointmentService.createAppointment(appointmentInput);
  }

  @Public()
  @Get('patient/:cpf')
  async findPatientAppointments(@Param('cpf') cpf: string) {
    return this.publicAppointmentService.findPatientAppointments(cpf);
  }

  @Public()
  @Post('patient/:cpf/cancel/:appointmentId')
  async cancelAppointment(
    @Param('cpf') cpf: string,
    @Param('appointmentId') appointmentId: string,
  ) {
    return this.publicAppointmentService.cancelAppointment(cpf, appointmentId);
  }
} 