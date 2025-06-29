import { PartialType } from '@nestjs/mapped-types';
import { CreateVinculoObraDto } from './create-obra-responsavel-tecnico.dto';

export class UpdateVinculoObraDto extends PartialType(CreateVinculoObraDto) {}
