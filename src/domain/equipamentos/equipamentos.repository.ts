import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Equipamentos } from './entities/equipamento.entity';
import { ObraEquipamento } from '../obra-equipamentos/dto/obra-equipamento.dto';
import { Obra } from '../obras/entities/obra.entity';

@Injectable()
export class EquipamentosRepository {
  constructor(
    @InjectRepository(Equipamentos)
    private readonly equipamentosRepository: Repository<Equipamentos>,
    @InjectRepository(ObraEquipamento)
    private readonly obraEquipamentoRepository: Repository<ObraEquipamento>,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosRepository.find();
  }

  async findOne(id: number): Promise<Equipamentos | null> {
  return this.equipamentosRepository.findOne({
    where: { id: Number(id) },
    relations: ['obras', 'fornecedor'], 
  });
}

  async create(equipamento: Equipamentos): Promise<Equipamentos | null> {
    const createdEquipamento = await this.equipamentosRepository.save(equipamento);

    if (equipamento.obras?.length) {
      const obraEquipamento: ObraEquipamento[] = equipamento.obras.map((obra: Obra) => ({
        equipamento_id: createdEquipamento.id,
        obra_id: obra.id,
      }));

      await this.obraEquipamentoRepository.save(obraEquipamento as any);
    }

    return this.findOne(createdEquipamento.id);
  }

  async update(id: number, equipamentoInput: Partial<Equipamentos>): Promise<Equipamentos | null> {
    const { obras, ...equipamentoData } = equipamentoInput;

    await this.equipamentosRepository.update(id, equipamentoData);

    if (obras) {
      await this.obraEquipamentoRepository.delete({ equipamento_id: id });

      if (obras.length > 0) {
        const obraEquipamento = obras.map((obra: Obra) => ({
          equipamento_id: id,
          obra_id: obra.id,
        }));

        await this.obraEquipamentoRepository.save(obraEquipamento as any);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipamentosRepository.delete(id);
  }

  async findOneByOptions(options: FindOneOptions<Equipamentos>): Promise<Equipamentos | null> {
    return this.equipamentosRepository.findOne(options);
  }


  async findByObraId(obraId: number): Promise<Equipamentos[]> {
  return this.equipamentosRepository
    .createQueryBuilder('equipamento')
    .leftJoin('equipamento.obras', 'obra')
    .leftJoinAndSelect('equipamento.fornecedor', 'fornecedor')
    .where('obra.id = :obraId', { obraId })
    .getMany();
}


  async updateObras(id: number, obras: Obra[]): Promise<Equipamentos | null> {
  await this.obraEquipamentoRepository.delete({ equipamento_id: id });

  const novasRelacoes = obras.map((obra) => ({
    equipamento_id: id,
    obra_id: obra.id,
  }));

  await this.obraEquipamentoRepository.save(novasRelacoes);

  return this.findOne(id);
  }

  async findEquipamentosEmUso(ids: number[]): Promise<Equipamentos[]> {
  return this.equipamentosRepository
    .createQueryBuilder('equipamento')
    .leftJoin('equipamento.obras', 'obra')
    .where('equipamento.id IN (:...ids)', { ids })
    .andWhere('obra.id IS NOT NULL') 
    .getMany();
}
}
