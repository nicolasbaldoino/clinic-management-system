import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [PrismaModule],
  providers: [PatientService, PatientResolver],
  exports: [PatientService],
})
export class PatientModule {} 