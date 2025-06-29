import { PartialType } from '@nestjs/mapped-types';
import { CreateFiscalizacoesDto } from './create-fiscalizacoes.dto';

export class UpdateFiscalizacoesDto extends PartialType(CreateFiscalizacoesDto) {}