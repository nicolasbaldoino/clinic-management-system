import { registerEnumType } from '@nestjs/graphql';
import { ScheduleStatus } from '@prisma/client';

registerEnumType(ScheduleStatus, {
  name: 'ScheduleStatus',
  description: 'Status do horário',
}); 