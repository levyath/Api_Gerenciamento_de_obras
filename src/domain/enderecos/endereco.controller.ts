import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';

@Controller('obras')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post(':id/endereco')
  create(@Param('id') id: number, @Body() endereco: CreateEnderecoDto) {
    return this.enderecoService.create(id, endereco);
  }

  @Get(':id/endereco')
  findOne(@Param('id') id: number) {
    return this.enderecoService.findOne(+id);
  }

  @Put(':id/endereco')
  update(@Param('id') id: number, @Body() endereco: CreateEnderecoDto) {
    return this.enderecoService.update(+id, endereco);
  }
}
