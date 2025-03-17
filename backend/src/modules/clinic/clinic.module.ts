import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ClinicResolver } from './clinic.resolver';
import { ClinicService } from './clinic.service';

@Module({
  imports: [PrismaModule],
  providers: [ClinicService, ClinicResolver],
  exports: [ClinicService],
})
export class ClinicModule {} 