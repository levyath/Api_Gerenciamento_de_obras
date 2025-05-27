import { Controller, Get, Param, Post, Body, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
  import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
  import { FiscalizacoesService } from './fiscalizacoes.service';
  import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';
  import { UpdateFiscalizacoesDto } from './dto/update-fiscalizacoes.dto';

@Controller('fiscalizacoes')
export class FiscalizacoesController {
    constructor(private readonly fiscalizacoesService: FiscalizacoesService) {}

    @Get()
    async findAll(): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Fiscalizacoes> {
        return this.fiscalizacoesService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesService.update(id, dto);
    }

    @Patch(':id')
    async patch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesService.patch(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.fiscalizacoesService.remove(id);
    }
}

@Controller('obras/:obraId/fiscalizacoes')
export class ObrasFiscalizacoesController {
    constructor(private readonly fiscalizacoesService: FiscalizacoesService) {}

    @Get()
    async findByObra(@Param('obraId', ParseIntPipe) obraId: number): Promise<Fiscalizacoes[]> {
        return this.fiscalizacoesService.findByObraId(obraId);
    }

    @Post()
    async createForObra(@Param('obraId', ParseIntPipe) obraId: number, @Body() dto: CreateFiscalizacoesDto): Promise<Fiscalizacoes> {
        return this.fiscalizacoesService.createForObra(obraId, dto);
    }
}
