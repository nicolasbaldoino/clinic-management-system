import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfessionalResolver } from './professional.resolver';
import { ProfessionalService } from './professional.service';

@Module({
  imports: [PrismaModule],
  providers: [ProfessionalResolver, ProfessionalService],
  exports: [ProfessionalService],
})
export class ProfessionalModule {} 