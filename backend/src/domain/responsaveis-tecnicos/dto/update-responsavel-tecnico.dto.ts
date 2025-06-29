import { PartialType } from '@nestjs/mapped-types';
import { CreateResponsavelTecnicoDto } from './create-responsavel-tecnico.dto';

export class UpdateResponsavelTecnicoDto extends PartialType(CreateResponsavelTecnicoDto) {}