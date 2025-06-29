import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException, UseGuards } from '@nestjs/common';
import { ResponsaveisTecnicosService } from './responsaveis-tecnicos.service';
import { ResponsavelTecnico } from './entities/responsavel-tecnico.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateResponsavelTecnicoDto } from './dto/create-responsavel-tecnico.dto';
import { UpdateResponsavelTecnicoDto } from './dto/update-responsavel-tecnico.dto';
import { CreateVinculoObraDto } from '../obra-responsavel-tecnico/dto/create-obra-responsavel-tecnico.dto';
import { ObraResponsavelTecnico } from '../obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { UpdateVinculoObraDto } from '../obra-responsavel-tecnico/dto/update-obra-responsavel-tecnico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Responsaveis Tecnicos')
@Controller('responsaveis-tecnicos')
export class ResponsaveisTecnicosController 
{
  constructor(private readonly responsavelTecnicoService: ResponsaveisTecnicosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os responsáveis técnicos' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Lista de responsáveis técnicos retornada com sucesso.', type: [ResponsavelTecnico] })
  async findAll(): Promise<ResponsavelTecnico[]> 
  {
    return await this.responsavelTecnicoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um responsável técnico por ID' })
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Responsável técnico encontrado com sucesso.', type: ResponsavelTecnico })
  @ApiBadRequestResponse({ description: 'ID inválido fornecido.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  async findOne(@Param('id') id: number): Promise<ResponsavelTecnico> 
  {
    return await this.responsavelTecnicoService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo responsável técnico' })
  @ApiResponse({ status: 201, description: 'Responsável técnico criado com sucesso.', type: ResponsavelTecnico })
  @ApiBadRequestResponse({ description: 'Dados obrigatórios ausentes ou CPF inválido.' })
  @ApiConflictResponse({ description: 'CPF já cadastrado no sistema.' })
  @ApiBody({ type: CreateResponsavelTecnicoDto, description: 'Dados do responsável técnico a ser criado' })
  async create(@Body() dto: CreateResponsavelTecnicoDto): Promise<ResponsavelTecnico> 
  {
    return await this.responsavelTecnicoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um responsável técnico existente' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Responsável técnico atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'ID inválido, dados incorretos (formato CPF, campos vazios), nenhum dado fornecido, tentativa de atualização sem alterações ou propriedades inválidas.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  @ApiConflictResponse({ description: 'Conflito de dados: Já existe um responsável técnico com este CPF ou registro profissional.' })
  @ApiBody({ type: UpdateResponsavelTecnicoDto, description: 'Dados atualizados do responsável técnico (campos permitidos: nome, cpf, registro_profissional, especialidade, ativo)' })
  async update(@Param('id') id: number, @Body() dto: UpdateResponsavelTecnicoDto ): Promise<void> 
  {
    await this.responsavelTecnicoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um responsável técnico' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Responsável técnico removido com sucesso - sem conteúdo retornado' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  @ApiConflictResponse({ description: 'Não é possível remover um responsável com vínculos ativos.' })
  async remove(@Param('id') id: number): Promise<void> 
  {
    await this.responsavelTecnicoService.remove(id);
  }

  // --- Gerenciamento de vínculos com obras ---

  @Post(':id/obras')
  @ApiOperation({ summary: 'Adicionar vínculos de obras ao responsável técnico' })
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Vínculos adicionados com sucesso.', type: [ObraResponsavelTecnico] })
  @ApiBadRequestResponse({ description: 'ID inválido ou dados dos vínculos incorretos.' })
  @ApiNotFoundResponse({ description: 'Responsável técnico não encontrado.' })
  @ApiConflictResponse({ description: 'Vínculo já existente ou conflito ao adicionar vínculo.' })
  @ApiBody({ type: CreateVinculoObraDto, isArray: true, description: 'Array de vínculos de obra para adicionar' })
  async addObras(@Param('id') id: number, @Body() vinculosDto: CreateVinculoObraDto[] ): Promise<ObraResponsavelTecnico[]> 
  {
    return await this.responsavelTecnicoService.createVinculosObra(id, vinculosDto);
  }

  @Put(':id/obras/:obraId')
  @ApiOperation({ summary: 'Atualizar vínculo específico entre responsável técnico e obra' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Vínculo atualizado com sucesso - sem conteúdo retornado.' })
  @ApiBody({ type: UpdateVinculoObraDto, description: 'Dados atualizados do vínculo' })
  async updateVinculoObra(@Param('id') responsavelId: number, @Param('obraId') obraId: number, @Body() dto: UpdateVinculoObraDto ): Promise<void> 
  {
    await this.responsavelTecnicoService.updateVinculoObra(responsavelId, obraId, dto);
  }

  @Get(':id/obras')
  @ApiOperation({ summary: 'Listar todos os vínculos de obras de um responsável técnico' })
  @HttpCode(204)
  @ApiResponse({ status: 200, description: 'Lista de vínculos retornada com sucesso.', type: [ObraResponsavelTecnico] })
  async findAllVinculoObras(@Param('id') id: number): Promise<ObraResponsavelTecnico[]> 
  {
    return await this.responsavelTecnicoService.findAllVinculosObra(id);
  }

  @Get(':id/obras/:obraId')
  @ApiOperation({ summary: 'Buscar vínculo específico entre responsável técnico e obra' })
  @HttpCode(204)
  @ApiResponse({ status: 200, description: 'Vínculo encontrado com sucesso.', type: ObraResponsavelTecnico })
  async findVinculoObra(@Param('id') responsavelId: number, @Param('obraId') obraId: number ): Promise<ObraResponsavelTecnico> 
  {
    return await this.responsavelTecnicoService.findVinculoObra(responsavelId, obraId);
  }

  @Delete(':id/obras/:obraId')
  @ApiOperation({ summary: 'Remover vínculo entre responsável técnico e obra' })
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Vínculo removido com sucesso - sem conteúdo retornado' })
  async deleteVinculoObra(@Param('id') responsavelId: number, @Param('obraId') obraId: number ): Promise<void>
  {
    await this.responsavelTecnicoService.deleteVinculoObra(responsavelId, obraId);
  }
}