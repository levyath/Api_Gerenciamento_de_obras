import { Controller, Get, Post, Body, Put, Param, BadRequestException } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Controller('obras')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post(':id/endereco')
  async create(@Param('id') id: number, @Body() endereco: CreateEnderecoDto) {
    try {
      return this.enderecoService.create(id, endereco);
     } catch (error) {
              throw new BadRequestException('Erro ao criar endereço da obra: ' + error.message);
          }
  }

  @Get(':id/endereco')
  async findOne(@Param('id') id: number) {
    try {
      return this.enderecoService.findOne(+id);
    } catch (error) {
              throw new BadRequestException('Erro ao visualizar endereço da obra: ' + error.message);
          }
  }

  @Put(':id/endereco')
  async update(@Param('id') id: number, @Body() endereco: CreateEnderecoDto) {
    try {
      return this.enderecoService.update(+id, endereco);
    } catch (error) {
              throw new BadRequestException('Erro ao atualizar endereço da obra: ' + error.message);
          }
  }
}
