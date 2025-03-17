import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Patient } from './models/patient.model';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
@UseGuards(JwtAuthGuard)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Query(() => [Patient])
  async patients() {
    return this.patientService.findAll();
  }

  @Query(() => Patient)
  async patient(@Args('id', { type: () => ID }) id: string) {
    return this.patientService.findOne(id);
  }

  @Query(() => Patient)
  async patientByCpf(@Args('cpf') cpf: string) {
    return this.patientService.findByCpf(cpf);
  }
} 