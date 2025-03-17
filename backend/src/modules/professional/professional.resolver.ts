import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Professional } from './models/professional.model';
import { ProfessionalService } from './professional.service';

@Resolver(() => Professional)
@UseGuards(JwtAuthGuard)
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Query(() => [Professional])
  async professionals() {
    return this.professionalService.findAll();
  }

  @Query(() => Professional)
  async professional(@Args('id', { type: () => ID }) id: string) {
    return this.professionalService.findOne(id);
  }

  @Query(() => [Professional])
  async professionalsByClinic(@Args('clinicId', { type: () => ID }) clinicId: string) {
    return this.professionalService.findByClinic(clinicId);
  }

  @Query(() => [Professional])
  async professionalsBySpeciality(
    @Args('speciality') speciality: string,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.professionalService.findBySpeciality(speciality, clinicId);
  }
} 