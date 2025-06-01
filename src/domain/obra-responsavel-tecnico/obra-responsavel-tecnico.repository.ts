import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObraResponsavelTecnico } from './entities/obra-responsavel-tecnico.entity';
import { CreateVinculoObraDto } from './dto/create-obra-responsavel-tecnico.dto';

@Injectable()
export class ObraResponsavelTecnicoRepository {
  constructor(
    @InjectModel(ObraResponsavelTecnico)
    private readonly obraRespTecnicoModel: typeof ObraResponsavelTecnico,
  ) {}

  async criarVinculo(responsavelTecnicoId: number, data: CreateVinculoObraDto ): Promise<ObraResponsavelTecnico>
  {
    const vinculo = await this.obraRespTecnicoModel.create({
      responsavelTecnicoId,
      obraId: data.obraId,
      data_inicio: new Date(data.dataInicio),
      data_fim: data.dataFim ? new Date(data.dataFim) : null,
      tipo_vinculo: data.tipoVinculo ?? 'RT Geral',
    });

    return vinculo;
  }

  async buscarVinculosPorResponsavel(responsavelTecnicoId: number): Promise<ObraResponsavelTecnico[]> {
    return this.obraRespTecnicoModel.findAll({
      where: { responsavelTecnicoId },
      include: [{ association: 'obra' }],
    });
  }
}