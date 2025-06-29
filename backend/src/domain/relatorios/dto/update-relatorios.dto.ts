import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatoriosDto } from './create-relatorios.dto'; 

export class UpdateRelatoriosDto extends PartialType(CreateRelatoriosDto) {}