import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ObrasService } from './obras.service';
import { Obras } from './entities/obras.entity';
import { CreateObraDto } from './dto/create-obra.dto';
import { UpdateObraDto } from './dto/update-obra.dto';

@Controller('obras')
export class ObrasController {
  constructor(private readonly obrasService: ObrasService) {}

  @Get()
  async findAll(): Promise<Obras[]> {
    return this.obrasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Obras> {
    const obra = await this.obrasService.findOne(id);
    if (!obra) {
      throw new NotFoundException(`Obra com id ${id} não encontrada.`);
    }
    return obra;
  }

  @Post()
  async create(@Body() data: CreateObraDto): Promise<Obras> {
    return this.obrasService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateObraDto,
  ): Promise<Obras> {
    const updated = await this.obrasService.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Obra com id ${id} não encontrada.`);
    }
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const deleted = await this.obrasService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Obra com id ${id} não encontrada.`);
    }
    return { message: `Obra com id ${id} removida com sucesso.` };
  }
}
