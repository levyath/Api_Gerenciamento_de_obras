import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { Fornecedores } from '../fornecedores/entities/fornecedores.entity';
import { ObraFornecedor } from '../obra-fornecedor/dto/obra-fornecedor.dto';

@Injectable()
export class ObrasRepository {
  constructor(
    @InjectRepository(Obra)
    private readonly obraRepository: Repository<Obra>,
    @InjectRepository(ObraFornecedor)
    private readonly obraFornecedor: Repository<ObraFornecedor>,
    private manager: EntityManager,
  ) {}



  
  async findAll(): Promise<Obra[]> {
    return this.obraRepository.find();
  }



  async findOne(id: number): Promise<Obra | null>{
    const obra = await this.obraRepository.findOneBy({ id: Number(id) });
    return obra;
  }


  async findOneSuppliers(id: number): Promise<Obra | null>{
    return this.obraRepository.findOne({
    where: { id: Number(id) },
    relations: ['fornecedores'], 
  });
  }


  async create(obraInput: Obra): Promise<Obra| null> {
  
  const createdObra = await this.obraRepository.save(obraInput);

  if (obraInput.fornecedores?.length) {
    const obraFornecedor: ObraFornecedor[] = obraInput.fornecedores.map((fornecedor: Fornecedores) => ({
      obra_id: createdObra.id,
      fornecedor_id: fornecedor.id,
    }));

    await this.obraFornecedor.save(obraFornecedor as any);
  }

  return this.findOne(createdObra.id);
  }



  async update(id: number, obraInput: Partial<Obra>): Promise<Obra | null> {
    const { fornecedores, ...obraData } = obraInput;

    await this.obraRepository.update(id, obraData);

    if (fornecedores) {
      await this.obraFornecedor.delete({ obra_id: id });

      if (fornecedores.length > 0) {
        const obraFornecedor = fornecedores.map((fornecedor: Fornecedores) => ({
          obra_id: id,
          fornecedor_id: fornecedor.id,
        }));

        await this.obraFornecedor.save(obraFornecedor as any);
      }
    }

    return this.findOne(id);
  }
  

  async remove(id: number): Promise<void> {
    await this.obraRepository.delete(id);
  }


  async findByIds(obrasIds: number[]): Promise<Obra[]> {
    return this.manager.find(Obra, {
      where: { id: In(obrasIds) },
    });
  }
}