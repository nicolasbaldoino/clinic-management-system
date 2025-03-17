import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ClinicsService } from './clinics.service';
import { CreateClinicInput } from './dto/create-clinic.input';
import { UpdateClinicInput } from './dto/update-clinic.input';
import { Clinic } from './models/clinic.model';

@Resolver(() => Clinic)
@UseGuards(JwtAuthGuard)
export class ClinicsResolver {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Query(() => [Clinic], { 
    name: 'clinics',
    description: 'Retorna a lista de todas as clínicas'
  })
  async findAll(): Promise<Clinic[]> {
    return this.clinicsService.findAll();
  }

  @Query(() => Clinic, { 
    name: 'clinic',
    description: 'Busca uma clínica pelo ID'
  })
  async findOne(@Args('id') id: string): Promise<Clinic> {
    return this.clinicsService.findOne(id);
  }

  @Mutation(() => Clinic, {
    description: 'Cria uma nova clínica'
  })
  async createClinic(@Args('input') input: CreateClinicInput): Promise<Clinic> {
    return this.clinicsService.create(input);
  }

  @Mutation(() => Clinic, {
    description: 'Atualiza os dados de uma clínica'
  })
  async updateClinic(
    @Args('id') id: string,
    @Args('input') input: UpdateClinicInput,
  ): Promise<Clinic> {
    return this.clinicsService.update(id, input);
  }

  @Mutation(() => Clinic, {
    description: 'Remove uma clínica'
  })
  async removeClinic(@Args('id') id: string): Promise<Clinic> {
    return this.clinicsService.remove(id);
  }
}
