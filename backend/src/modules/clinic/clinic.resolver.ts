import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClinicService } from './clinic.service';
import { CreateClinicInput, UpdateClinicInput } from './dto/clinic.input';
import { Clinic } from './models/clinic.model';

@Resolver(() => Clinic)
@UseGuards(JwtAuthGuard)
export class ClinicResolver {
  constructor(private readonly clinicService: ClinicService) {}

  @Mutation(() => Clinic)
  createClinic(@Args('createClinicInput') createClinicInput: CreateClinicInput) {
    return this.clinicService.create(createClinicInput);
  }

  @Query(() => [Clinic])
  clinics() {
    return this.clinicService.findAll();
  }

  @Query(() => Clinic)
  clinic(@Args('id', { type: () => ID }) id: string) {
    return this.clinicService.findOne(id);
  }

  @Mutation(() => Clinic)
  updateClinic(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateClinicInput') updateClinicInput: UpdateClinicInput,
  ) {
    return this.clinicService.update(id, updateClinicInput);
  }

  @Mutation(() => Clinic)
  removeClinic(@Args('id', { type: () => ID }) id: string) {
    return this.clinicService.remove(id);
  }
} 