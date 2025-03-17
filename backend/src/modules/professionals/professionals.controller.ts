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
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { ProfessionalsService } from './professionals.service';

@ApiTags('Profissionais')
@Controller('professionals')
@UseGuards(AuthGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo profissional' })
  @ApiResponse({ status: 201, description: 'Profissional criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(@Body() createProfessionalDto: CreateProfessionalDto, @Request() req) {
    return this.professionalsService.create(
      createProfessionalDto,
      req.user.clinicId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os profissionais da clínica' })
  @ApiResponse({ status: 200, description: 'Lista de profissionais retornada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll(@Request() req) {
    return this.professionalsService.findAll(req.user.clinicId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar profissional por ID' })
  @ApiResponse({ status: 200, description: 'Profissional encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Profissional não encontrado' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.professionalsService.findOne(id, req.user.clinicId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados do profissional' })
  @ApiResponse({ status: 200, description: 'Profissional atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Profissional não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
    @Request() req,
  ) {
    return this.professionalsService.update(
      id,
      updateProfessionalDto,
      req.user.clinicId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover profissional' })
  @ApiResponse({ status: 200, description: 'Profissional removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Profissional não encontrado' })
  remove(@Param('id') id: string, @Request() req) {
    return this.professionalsService.remove(id, req.user.clinicId);
  }
} 