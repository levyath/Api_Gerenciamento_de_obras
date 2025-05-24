import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { Fiscalizacoes } from './entities/fiscalizacoes.entity';
import { FiscalizacoesService } from './fiscalizacoes.service';
import { CreateFiscalizacoesDto } from './dto/create-fiscalizacoes.dto';

@Controller('fiscalizacoes')
export class FiscalizacoesController {
    //todo
}