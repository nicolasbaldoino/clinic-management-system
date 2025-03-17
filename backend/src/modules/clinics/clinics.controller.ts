import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ClinicsService } from './clinics.service';
import { CreateClinicInput } from './dto/create-clinic.input';
import { UpdateClinicInput } from './dto/update-clinic.input';

@ApiTags('Clínicas')
@Controller('clinics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova clínica' })
  @ApiResponse({ status: 201, description: 'Clínica criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createClinicDto: CreateClinicInput) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as clínicas' })
  @ApiResponse({ status: 200, description: 'Lista de clínicas retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar clínica por ID' })
  @ApiResponse({ status: 200, description: 'Clínica encontrada' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados da clínica' })
  @ApiResponse({ status: 200, description: 'Clínica atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicInput) {
    return this.clinicsService.update(id, updateClinicDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover clínica' })
  @ApiResponse({ status: 200, description: 'Clínica removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(id);
  }
}
