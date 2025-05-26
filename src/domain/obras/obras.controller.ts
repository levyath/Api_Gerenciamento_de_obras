import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obra } from './entities/obra.entity';
import { CreateObraDto } from './dto/create-obra.dto';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obraService: ObrasService) {}
  @Get()
  async findAll(): Promise<any>{
    try {
      return this.obraService.findAll();
    } catch (error) {
          throw new BadRequestException('Erro ao listar obras: ' + error.message);
      }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Obra | null> {
    try {
      return this.obraService.findOne(id);
    } catch (error) {
          throw new BadRequestException('Erro ao visualizar obra: ' + error.message);
      }
  }

  @Post()
  async create(@Body() obra: CreateObraDto): Promise<Obra | null> {
    try {
      return this.obraService.create(obra);
    } catch (error) {
          throw new BadRequestException('Erro ao criar obra: ' + error.message);
      }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() obra: CreateObraDto): Promise<Obra | null> {
    try {
      return this.obraService.update(id, obra);
    } catch (error) {
          throw new BadRequestException('Erro ao atualizar obra: ' + error.message);
      }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    try {
      return this.obraService.remove(id);
     } catch (error) {
          throw new BadRequestException('Erro ao deletar obra: ' + error.message);
      }
  }
}