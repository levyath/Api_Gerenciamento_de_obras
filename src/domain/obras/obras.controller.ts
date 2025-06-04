import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiBearerAuth
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Obras')
@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todas as obras' })
  @ApiResponse({ status: 200, description: 'Lista de obras retornada com sucesso.', type: [Obras] })
  async findAll(): Promise<Obras[]> {
    try {
      return await this.obrasService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar obras: ' + error.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma obra por ID' })
  @ApiResponse({ status: 200, description: 'Obra encontrada.', type: Obras })
  @ApiNotFoundResponse({ description: 'Obra não encontrada.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Obras | null> {
    try {
      return await this.obrasService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar obra: ' + error.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar uma nova obra' })
  @ApiResponse({ status: 201, description: 'Obra criada com sucesso.', type: Obras })
  @ApiBody({ type: CreateObraDto })
  async create(@Body() data: CreateObraDto): Promise<Obras> {
    try {
      return await this.obrasService.create(data);
    } catch (error) {
      throw new BadRequestException('Erro ao criar obra: ' + error.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma obra existente' })
  @ApiResponse({ status: 200, description: 'Obra atualizada com sucesso.', type: Obras })
  @ApiNotFoundResponse({ description: 'Obra não encontrada.' })
  @ApiBody({ type: UpdateObraDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateObraDto,
  ): Promise<Obras | null> {
    try {
      return await this.obrasService.update(id, data);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar obra: ' + error.message);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma obra por ID' })
  @ApiResponse({ status: 200, description: 'Obra removida com sucesso.' })
  @ApiNotFoundResponse({ description: 'Obra não encontrada.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    try {
      await this.obrasService.remove(id);
      return { message: `Obra com id ${id} removida com sucesso.` };
    } catch (error) {
      throw new BadRequestException('Erro ao remover obra: ' + error.message);
    }
  }
}