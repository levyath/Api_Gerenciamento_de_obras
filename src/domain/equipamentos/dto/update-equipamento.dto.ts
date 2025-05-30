import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipamentoDto } from './create-equipamento.dto';

export class UpdateEquipamentoDto extends PartialType(CreateEquipamentoDto) {}
