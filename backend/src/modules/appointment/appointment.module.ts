import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { PublicAppointmentController } from './public-appointment.controller';
import { PublicAppointmentResolver } from './public-appointment.resolver';
import { PublicAppointmentService } from './public-appointment.service';

@Module({
  imports: [PrismaModule],
  providers: [
    AppointmentResolver,
    PublicAppointmentResolver,
    AppointmentService,
    PublicAppointmentService,
  ],
  controllers: [PublicAppointmentController],
  exports: [AppointmentService, PublicAppointmentService],
})
export class AppointmentModule {} 