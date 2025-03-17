import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schedule } from '../schedule/models/schedule.model';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { Appointment } from './models/appointment.model';
import { PublicAppointmentService } from './public-appointment.service';

@Resolver(() => Appointment)
export class PublicAppointmentResolver {
  constructor(private readonly publicAppointmentService: PublicAppointmentService) {}

  @Query(() => [Schedule])
  async availableSchedules(
    @Args('clinicId', { type: () => ID }) clinicId: string,
    @Args('professionalId', { type: () => ID }) professionalId: string,
    @Args('date') date: Date,
  ) {
    return this.publicAppointmentService.findAvailableSchedules(
      clinicId,
      professionalId,
      date,
    );
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('input') input: CreateAppointmentInput,
  ) {
    return this.publicAppointmentService.createAppointment(input);
  }

  @Query(() => [Appointment])
  async patientAppointments(
    @Args('cpf') cpf: string,
  ) {
    return this.publicAppointmentService.findPatientAppointments(cpf);
  }

  @Mutation(() => Appointment)
  async cancelAppointment(
    @Args('cpf') cpf: string,
    @Args('appointmentId', { type: () => ID }) appointmentId: string,
  ) {
    return this.publicAppointmentService.cancelAppointment(cpf, appointmentId);
  }
} 