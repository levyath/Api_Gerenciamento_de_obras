import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ObraResponsavelTecnico } from './entities/obra-responsavel-tecnico.entity';
import { CreateVinculoObraDto } from './dto/create-obra-responsavel-tecnico.dto';
import { UpdateVinculoObraDto } from './dto/update-obra-responsavel-tecnico.dto';

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

  async buscarVinculo(responsavelTecnicoId: number, obraId: number): Promise<ObraResponsavelTecnico | null> {
    return this.obraRespTecnicoModel.findOne({
      where: { responsavelTecnicoId, obraId },
      include: [
        { association: 'obra' },
        { association: 'responsavel' },
      ],
    });
  }

  async atualizarVinculo(responsavelTecnicoId: number, obraId: number, dadosAtualizacao: UpdateVinculoObraDto ): Promise<ObraResponsavelTecnico | null> 
  {
    const vinculo = await this.obraRespTecnicoModel.findOne({
      where: { responsavelTecnicoId, obraId },
    });
    if (!vinculo) return null;

    if (dadosAtualizacao.dataInicio !== undefined) {
      vinculo.data_inicio = new Date(dadosAtualizacao.dataInicio);
    }
    if (dadosAtualizacao.dataFim !== undefined) {
      vinculo.data_fim = dadosAtualizacao.dataFim ? new Date(dadosAtualizacao.dataFim) : undefined;
    }
    if (dadosAtualizacao.tipoVinculo !== undefined) {
      vinculo.tipo_vinculo = dadosAtualizacao.tipoVinculo;
    }

    await vinculo.save();
    return vinculo;
  }

  async removerVinculo(responsavelTecnicoId: number, obraId: number ): Promise<void> 
  {
    await this.obraRespTecnicoModel.destroy({
      where: { responsavelTecnicoId, obraId },
    });
  }
}