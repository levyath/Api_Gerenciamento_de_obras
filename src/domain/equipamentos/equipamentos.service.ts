import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { EquipamentosRepository } from './equipamentos.repository';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { Equipamentos } from './entities/equipamento.entity';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { Obras } from '../obras/entities/obras.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EquipamentosService {
  constructor(
    private readonly equipamentosRepository: EquipamentosRepository,
    @InjectModel(Obras)
    private readonly obrasRepository: typeof Obras,
    @InjectModel(Fornecedores)
    private readonly fornecedoresRepository: typeof Fornecedores,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return this.equipamentosRepository.findAll();
  }

  async findOne(id: number): Promise<Equipamentos | null> {
    const existeEquipamento = await this.equipamentosRepository.findById(id);

    if (!existeEquipamento) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    return this.equipamentosRepository.findById(id);
  }

  async create(data: CreateEquipamentoDto): Promise<Equipamentos> {

    if (data.numeroDeSerie) {
      const existe = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: data.numeroDeSerie },
      });

      if (existe) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (data.fornecedorId) {
      const fornecedor = await this.fornecedoresRepository.findOne({
        where: { id: data.fornecedorId },
      });

      if (!fornecedor) {
        throw new HttpException(
          'O fornecedor informado não existe.',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (data.obrasId?.length) {
      const obraIds = data.obrasId;

      const obrasExistentes = await this.obrasRepository.findAll({
        where: { id: obraIds },
      });

      if (obrasExistentes.length !== obraIds.length) {
        const idsIncorretos = obraIds.filter(
          (id) => !obrasExistentes.some((obra) => obra.id === id)
        );

        throw new HttpException(
          `As obras a seguir não existem: ${idsIncorretos.join(', ')}`,
          HttpStatus.NOT_FOUND,
        );
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }
    return this.equipamentosRepository.create(data);
  }

  async update(id: number, data: Partial<UpdateEquipamentoDto>): Promise<void> {

    const existeEquipamento = await this.equipamentosRepository.findById(id);

    if (!existeEquipamento) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    if (data.numeroDeSerie) {
      const existe = await this.equipamentosRepository.findOneByOptions({
        where: { numeroDeSerie: data.numeroDeSerie },
      });

      if (existe) {
        throw new HttpException(
          'Já existe um equipamento com o mesmo número de série.',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (data.fornecedorId) {
      const fornecedor = await this.fornecedoresRepository.findOne({
        where: { id: data.fornecedorId },
      });

      if (!fornecedor) {
        throw new HttpException(
          'O fornecedor informado não existe.',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    if (data.obrasId?.length) {
      const obraIds = data.obrasId;

      const obrasExistentes = await this.obrasRepository.findAll({
        where: { id: obraIds },
      });

      if (obrasExistentes.length !== obraIds.length) {
        const idsIncorretos = obraIds.filter(
          (id) => !obrasExistentes.some((obra) => obra.id === id)
        );

        throw new HttpException(
          `As obras a seguir não existem: ${idsIncorretos.join(', ')}`,
          HttpStatus.NOT_FOUND,
        );
      }

      data.obrasId = obrasExistentes.map((obra) => obra.id);
    }
    
    await this.equipamentosRepository.update(id, data);
  }


    async updateObras(id: number, obrasIds: number[]) {
    const equipamento = await this.equipamentosRepository.findById(id);

    if (!equipamento) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    const obras = await this.obrasRepository.findAll({
      where: { id: obrasIds },
    });

    if (obras.length !== obrasIds.length) {
      const idsIncorretos = obrasIds.filter(
        (id) => !obras.some((obra) => obra.id === id)
      );

      throw new HttpException(
        `As obras a seguir não existem: ${idsIncorretos.join(', ')}`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.equipamentosRepository.updateObras(equipamento, obras);
  }


  async delete(id: number): Promise<void> {
    const existeEquipamento = await this.equipamentosRepository.findById(id);
    if (!existeEquipamento) {
      throw new NotFoundException('O equipamento buscado não existe!');
    }

    this.equipamentosRepository.remove(id);
  }

  async getEquipamentosByObraId(obraId: number) {
  const obra = await this.obrasRepository.findByPk(obraId);

  if (!obra) {
    throw new NotFoundException('A obra buscada não existe!');
  }

  const equipamentos = await this.equipamentosRepository.findByObraId(obraId);

  if (!equipamentos || equipamentos.length === 0) {
    throw new NotFoundException(`Nenhum equipamento encontrado para a obra de ID ${obraId}.`);
  }

  return equipamentos;
}
}

