import { PartialType } from '@nestjs/mapped-types';
import { CreateEtapasDaObraDto } from './create-etapas-da-obra.dto';

export class UpdateEtapasDaObraDto extends PartialType(CreateEtapasDaObraDto) {}
