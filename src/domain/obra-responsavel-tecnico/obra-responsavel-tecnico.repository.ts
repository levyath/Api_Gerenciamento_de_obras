import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObraResponsavelTecnico } from './entities/obra-responsavel-tecnico.entity';

@Injectable()
export class ObraResponsavelTecnicoRepository {
  constructor(
    @InjectModel(ObraResponsavelTecnico)
    private readonly obraRespTecnicoModel: typeof ObraResponsavelTecnico,
  ) {}

  async buscarVinculosPorResponsavel(responsavelTecnicoId: number): Promise<ObraResponsavelTecnico[]> {
    return this.obraRespTecnicoModel.findAll({
      where: { responsavelTecnicoId },
      include: [{ association: 'obra' }],
    });
  }
}