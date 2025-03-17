import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from './models/appointment.model';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Query(() => [Appointment], {
    description: 'Retorna a lista de todas as consultas'
  })
  async appointments(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Query(() => Appointment, {
    description: 'Busca uma consulta pelo ID'
  })
  async appointment(@Args('id') id: string): Promise<Appointment> {
    return this.appointmentsService.findOne(id);
  }

  @Mutation(() => Appointment, {
    description: 'Cria uma nova consulta'
  })
  async createAppointment(
    @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Mutation(() => Appointment, {
    description: 'Atualiza os dados de uma consulta'
  })
  async updateAppointment(
    @Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentsService.update(
      updateAppointmentInput.id,
      updateAppointmentInput,
    );
  }

  @Mutation(() => Appointment, {
    description: 'Remove uma consulta'
  })
  async removeAppointment(@Args('id') id: string): Promise<Appointment> {
    return this.appointmentsService.remove(id);
  }
} 