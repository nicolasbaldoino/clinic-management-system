import { registerEnumType } from '@nestjs/graphql';
import { AppointmentStatus } from '@prisma/client';

registerEnumType(AppointmentStatus, {
  name: 'AppointmentStatus',
  description: 'Status da consulta',
}); 