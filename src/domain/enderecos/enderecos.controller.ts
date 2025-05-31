import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { Endereco } from './entities/endereco.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Endereços') // Agrupa no Swagger
@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os endereços' })
  @ApiResponse({ status: 200, description: 'Lista de endereços retornada com sucesso.', type: [Endereco] })
  async findAll(): Promise<Endereco[]> {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um endereço pelo ID' })
  @ApiResponse({ status: 200, description: 'Endereço encontrado.', type: Endereco })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Endereco> {
    const endereco = await this.enderecosService.findOne(id);
    if (!endereco) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return endereco;
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo endereço' })
  @ApiResponse({ status: 201, description: 'Endereço criado com sucesso.', type: Endereco })
  @ApiBody({ type: CreateEnderecoDto })
  async create(@Body() data: CreateEnderecoDto): Promise<Endereco> {
    return this.enderecosService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um endereço existente' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso.', type: Endereco })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  @ApiBody({ type: UpdateEnderecoDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateEnderecoDto>,
  ): Promise<Endereco> {
    const updated = await this.enderecosService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um endereço pelo ID' })
  @ApiResponse({ status: 200, description: 'Endereço removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Endereço não encontrado.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.enderecosService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Endereço com id ${id} não encontrado.`);
    }
    return { message: `Endereço com id ${id} removido com sucesso.` };
  }
}
