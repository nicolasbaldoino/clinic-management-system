import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateAppointmentInput } from './create-appointment.input';

@InputType()
export class UpdateAppointmentInput extends PartialType(CreateAppointmentInput) {
  @Field()
  id: string;
} 