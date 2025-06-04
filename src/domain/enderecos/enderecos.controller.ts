import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Enderecos')
@Controller('enderecos')
export class EnderecosGlobalController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços cadastrados' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso.', type: [Endereco] })
  @ApiResponse({ status: 400, description: 'Erro ao listar endereços.', })
  async findAll(): Promise<Endereco[]> {
    try {
      return await this.enderecosService.findAll();
    } catch (error) {
      throw new BadRequestException('Erro ao listar endereços: ' + error.message);
    }
  }
}

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@ApiTags('Enderecos')
@Controller('obras')
export class ObrasEnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Post(':id/endereco')
  @ApiOperation({ summary: 'Criar um novo endereço para uma obra' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Endereco })
  @ApiBody({ type: CreateEnderecoDto })
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() endereco: CreateEnderecoDto,
  ): Promise<Endereco | null> {
    try {
      return await this.enderecosService.create(id, endereco);
    } catch (error) {
      throw new BadRequestException('Erro ao criar endereço da obra: ' + error.message);
    }
  }

  @Get(':id/endereco')
  @ApiOperation({ summary: 'Buscar o endereço de uma obra' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado.', type: Endereco })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Endereco | null> {
    try {
      return await this.enderecosService.findOne(id);
    } catch (error) {
      throw new BadRequestException('Erro ao buscar endereço da obra: ' + error.message);
    }
  }

  @Put(':id/endereco')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar o endereço de uma obra' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.', type: Endereco })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  @ApiBody({ type: UpdateEnderecoDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() endereco: UpdateEnderecoDto,
  ): Promise<void> {
    try {
      await this.enderecosService.update(id, endereco);
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar endereço da obra: ' + error.message);
    }
  }
}