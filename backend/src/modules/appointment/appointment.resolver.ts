import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { AppointmentStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppointmentService } from './appointment.service';
import { Appointment } from './models/appointment.model';

@Resolver(() => Appointment)
@UseGuards(JwtAuthGuard)
export class AppointmentResolver {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Query(() => [Appointment])
  async appointments() {
    return this.appointmentService.findAll();
  }

  @Query(() => Appointment)
  async appointment(@Args('id', { type: () => ID }) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Query(() => [Appointment])
  async appointmentsByClinic(@Args('clinicId', { type: () => ID }) clinicId: string) {
    return this.appointmentService.findByClinic(clinicId);
  }

  @Query(() => [Appointment])
  async appointmentsByPatient(@Args('patientId', { type: () => ID }) patientId: string) {
    return this.appointmentService.findByPatient(patientId);
  }

  @Query(() => [Appointment])
  async appointmentsByProfessional(
    @Args('professionalId', { type: () => ID }) professionalId: string,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.appointmentService.findByProfessional(professionalId, clinicId);
  }

  @Query(() => [Appointment])
  async appointmentsByStatus(
    @Args('status', { type: () => AppointmentStatus }) status: AppointmentStatus,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.appointmentService.findByStatus(status, clinicId);
  }
} 