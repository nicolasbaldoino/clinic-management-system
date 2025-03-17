import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ScheduleStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateScheduleInput, UpdateScheduleInput } from './dto/schedule.input';
import { Schedule } from './models/schedule.model';
import { ScheduleService } from './schedule.service';

@Resolver(() => Schedule)
@UseGuards(JwtAuthGuard)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args('createScheduleInput') createScheduleInput: CreateScheduleInput) {
    return this.scheduleService.create(createScheduleInput);
  }

  @Query(() => [Schedule])
  async schedules() {
    return this.scheduleService.findAll();
  }

  @Query(() => Schedule)
  async schedule(@Args('id', { type: () => ID }) id: string) {
    return this.scheduleService.findOne(id);
  }

  @Query(() => [Schedule])
  async schedulesByClinic(@Args('clinicId', { type: () => ID }) clinicId: string) {
    return this.scheduleService.findByClinic(clinicId);
  }

  @Query(() => [Schedule])
  async schedulesByProfessional(
    @Args('professionalId', { type: () => ID }) professionalId: string,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.scheduleService.findByProfessional(professionalId, clinicId);
  }

  @Query(() => [Schedule])
  async schedulesByDate(
    @Args('date') date: string,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.scheduleService.findByDate(new Date(date), clinicId);
  }

  @Mutation(() => Schedule)
  updateSchedule(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateScheduleInput') updateScheduleInput: UpdateScheduleInput,
  ) {
    return this.scheduleService.update(id, updateScheduleInput);
  }

  @Mutation(() => Schedule)
  removeSchedule(@Args('id', { type: () => ID }) id: string) {
    return this.scheduleService.remove(id);
  }

  @Query(() => [Schedule])
  async availableSchedules(
    @Args('clinicId', { type: () => ID }) clinicId: string,
    @Args('professionalId', { type: () => ID }) professionalId: string,
    @Args('date') date: Date,
  ) {
    return this.scheduleService.findAvailable(clinicId, professionalId, date);
  }

  @Query(() => [Schedule])
  async schedulesByStatus(
    @Args('status', { type: () => ScheduleStatus }) status: ScheduleStatus,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.scheduleService.findByStatus(status, clinicId);
  }
} 