import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ClinicsController } from './clinics.controller';
import { ClinicsResolver } from './clinics.resolver';
import { ClinicsService } from './clinics.service';

@Module({
  providers: [ClinicsService, ClinicsResolver, PrismaService],
  controllers: [ClinicsController],
  exports: [ClinicsService],
})
export class ClinicsModule {}
