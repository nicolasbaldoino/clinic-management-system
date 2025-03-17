import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiTags('Agendamentos')
@Controller('schedules')
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo horário disponível' })
  @ApiResponse({ status: 201, description: 'Horário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createScheduleDto: CreateScheduleDto, @Request() req) {
    return this.schedulesService.create(createScheduleDto, req.user.clinicId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os horários da clínica' })
  @ApiResponse({ status: 200, description: 'Lista de horários retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll(@Request() req) {
    return this.schedulesService.findAll(req.user.clinicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar horário por ID' })
  @ApiResponse({ status: 200, description: 'Horário encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Horário não encontrado' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.schedulesService.findOne(id, req.user.clinicId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar horário' })
  @ApiResponse({ status: 200, description: 'Horário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Horário não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Request() req,
  ) {
    return this.schedulesService.update(
      id,
      updateScheduleDto,
      req.user.clinicId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover horário' })
  @ApiResponse({ status: 200, description: 'Horário removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Horário não encontrado' })
  remove(@Param('id') id: string, @Request() req) {
    return this.schedulesService.remove(id, req.user.clinicId);
  }
} 