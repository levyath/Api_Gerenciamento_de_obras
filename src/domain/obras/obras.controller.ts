import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObrasService } from './obras.service';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @Post()
  create(@Body() createObraDto: CreateObraDto) {
    return this.obrasService.create(createObraDto);
  }

  @Get()
  findAll() {
    return this.obrasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obrasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObraDto: UpdateObraDto) {
    return this.obrasService.update(+id, updateObraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obrasService.remove(+id);
  }
}
