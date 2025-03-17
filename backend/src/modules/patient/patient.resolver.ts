import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePatientInput, UpdatePatientInput } from './dto/patient.input';
import { Patient } from './models/patient.model';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
@UseGuards(JwtAuthGuard)
export class PatientResolver {
  constructor(private readonly patientService: PatientService) {}

  @Mutation(() => Patient)
  createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    return this.patientService.create(createPatientInput);
  }

  @Query(() => [Patient])
  patients() {
    return this.patientService.findAll();
  }

  @Query(() => Patient)
  patient(@Args('id', { type: () => ID }) id: string) {
    return this.patientService.findOne(id);
  }

  @Query(() => Patient)
  patientByCpf(@Args('cpf') cpf: string) {
    return this.patientService.findByCpf(cpf);
  }

  @Mutation(() => Patient)
  updatePatient(
    @Args('id', { type: () => ID }) id: string,
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput,
  ) {
    return this.patientService.update(id, updatePatientInput);
  }

  @Mutation(() => Patient)
  removePatient(@Args('id', { type: () => ID }) id: string) {
    return this.patientService.remove(id);
  }
} 