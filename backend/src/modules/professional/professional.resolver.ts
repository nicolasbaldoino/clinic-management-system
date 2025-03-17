import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfessionalInput, UpdateProfessionalInput } from './dto/professional.input';
import { Professional } from './models/professional.model';
import { ProfessionalService } from './professional.service';

@Resolver(() => Professional)
@UseGuards(JwtAuthGuard)
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Mutation(() => Professional)
  createProfessional(@Args('createProfessionalInput') createProfessionalInput: CreateProfessionalInput) {
    return this.professionalService.create(createProfessionalInput);
  }

  @Query(() => [Professional])
  professionals() {
    return this.professionalService.findAll();
  }

  @Query(() => Professional)
  professional(@Args('id', { type: () => ID }) id: string) {
    return this.professionalService.findOne(id);
  }

  @Query(() => [Professional])
  professionalsByClinic(@Args('clinicId', { type: () => ID }) clinicId: string) {
    return this.professionalService.findByClinic(clinicId);
  }

  @Query(() => [Professional])
  async professionalsBySpeciality(
    @Args('speciality') speciality: string,
    @Args('clinicId', { type: () => ID }) clinicId: string,
  ) {
    return this.professionalService.findBySpeciality(speciality, clinicId);
  }

  @Mutation(() => Professional)
  updateProfessional(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateProfessionalInput') updateProfessionalInput: UpdateProfessionalInput,
  ) {
    return this.professionalService.update(id, updateProfessionalInput);
  }

  @Mutation(() => Professional)
  removeProfessional(@Args('id', { type: () => ID }) id: string) {
    return this.professionalService.remove(id);
  }
} 