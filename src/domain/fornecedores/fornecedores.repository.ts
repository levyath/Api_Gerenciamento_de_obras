import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Fornecedores } from './entities/fornecedores.entity';
import { ObraFornecedor } from '../obra-fornecedor/dto/obra-fornecedor.dto';
import { Obra } from '../obras/entities/obra.entity';

@Injectable()
export class FornecedoresRepository {
  constructor(
    @InjectRepository(Fornecedores)
    private readonly fornecedoresRepository: Repository<Fornecedores>,
    @InjectRepository(ObraFornecedor)
    private readonly obraFornecedor: Repository<ObraFornecedor>,
  ) {}


  async findAll(): Promise<Fornecedores[]> {
    return this.fornecedoresRepository.find();
  }


 async findOne(id: number): Promise<Fornecedores | null> {
  return this.fornecedoresRepository.findOne({
    where: { id: Number(id) },
    relations: ['obras'], 
  });
}


  async create(fornecedor: Fornecedores): Promise<Fornecedores | null> {

  const createdFornecedor = await this.fornecedoresRepository.save(fornecedor);

  if (fornecedor.obras?.length) {
    const obraFornecedor: ObraFornecedor[] = fornecedor.obras.map((obra: Obra) => ({
      fornecedor_id: createdFornecedor.id,
      obra_id: obra.id,
    }));

    await this.obraFornecedor.save(obraFornecedor as any);
  }

  return this.findOne(createdFornecedor.id);
}


  async update(id: number, fornecedorInput: Partial<Fornecedores>): Promise<Fornecedores | null> {
  const { obras, ...fornecedorData } = fornecedorInput;

  await this.fornecedoresRepository.update(id, fornecedorData);

  if (obras) {
    await this.obraFornecedor.delete({ fornecedor_id: id });

    if (obras.length > 0) {
      const obraFornecedor = obras.map((obra: Obra) => ({
        fornecedor_id: id,
        obra_id: obra.id,
      }));
      await this.obraFornecedor.save(obraFornecedor as any);
    }
  }

  return this.findOne(id);
}


   async updateActive(id: number, ativo: boolean): Promise<Fornecedores | null> {
  await this.fornecedoresRepository.update(id, { ativo });
  return this.findOne(id);
}


  async remove(id: number): Promise<void> {
    await this.fornecedoresRepository.delete(id);
  }


  async findOneByOptions(options: FindOneOptions<Fornecedores>): Promise<Fornecedores | null> {
    return this.fornecedoresRepository.findOne(options);
  }

}