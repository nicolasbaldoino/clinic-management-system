import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [PrismaModule],
  providers: [ScheduleResolver, ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {} 