import { PartialType } from '@nestjs/mapped-types';
import { CreateDiarioDeObraDto } from './create-diario-de-obra.dto';

export class UpdateDiarioDeObraDto extends PartialType(CreateDiarioDeObraDto) {}
