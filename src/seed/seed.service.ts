import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { Obras } from 'src/domain/obras/entities/obras.entity';
import { Fornecedores } from 'src/domain/fornecedores/entities/fornecedores.entity';
import { Equipamentos } from 'src/domain/equipamentos/entities/equipamento.entity';
import { Endereco } from 'src/domain/enderecos/entities/endereco.entity';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { EtapasDaObra, EtapaStatus } from 'src/domain/etapas-da-obra/entities/etapas-da-obra.entity';
import { DiarioDeObra } from 'src/domain/diario-de-obra/entities/diario-de-obra.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Obras) private obrasModel: typeof Obras,
    @InjectModel(Fornecedores) private fornecedoresModel: typeof Fornecedores,
    @InjectModel(Equipamentos) private equipamentosModel: typeof Equipamentos,
    @InjectModel(Endereco) private enderecoModel: typeof Endereco,
    @InjectModel(ObrasEquipamentos) private obrasEquipamentosModel: typeof ObrasEquipamentos,
    @InjectModel(ObrasFornecedores) private obrasFornecedoresModel: typeof ObrasFornecedores,
    @InjectModel(EtapasDaObra) private etapasModel: typeof EtapasDaObra,
    @InjectModel(DiarioDeObra) private diariosModel: typeof DiarioDeObra,
    private configService: ConfigService,
    private sequelize: Sequelize,
  ) {}

  async onModuleInit() {
    const env = this.configService.get<string>('NODE_ENV');
    if (env === 'development') {
      await this.seedDevelopment();
    } else if (env === 'production') {
      await this.seedProduction();
    }
  }

  async clearAll() {
    await this.diariosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.etapasModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasEquipamentosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasFornecedoresModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.equipamentosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.fornecedoresModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.enderecoModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
  }

  async resetSequences() {
    const sequences = [
      'obras_id_seq',
      'fornecedores_id_seq',
      'equipamentos_id_seq',
      'enderecos_id_seq',
      'obras_equipamentos_id_seq',
      'obras_fornecedores_id_seq',
      'etapas_obra_id_seq',
      'diarios_obra_id_seq',
    ];

    for (const seq of sequences) {
      try {
        await this.sequelize.query(`ALTER SEQUENCE "${seq}" RESTART WITH 1`);
        console.log(`Sequence ${seq} reiniciada.`);
      } catch {
        console.warn(`Sequence ${seq} não existe ou não pode ser reiniciada, ignorando.`);
      }
    }
  }

  async seedDevelopment() {
    console.log('🔁 Gerando seed de desenvolvimento...');
    await this.clearAll();
    await this.resetSequences();
    await this.seedData(false);
  }

  async seedProduction() {
    const count = await this.obrasModel.count();
    if (count > 0) {
      console.log('✅ Seed já existente em produção. Nenhuma ação realizada.');
      return;
    }
    console.log('🚀 Gerando seed fixa para produção...');
    await this.seedData(true);
  }

 async seedData(isProd: boolean) {
  const fornecedores: Fornecedores[] = [];
  const equipamentos: Equipamentos[] = [];
  const obras: Obras[] = [];

  // Fornecedores com endereço preenchido e e-mail baseado no nome
  for (let i = 0; i < 12; i++) {
    let nomeFornecedor = isProd ? `Fornecedor ${i + 1}` : faker.company.name();
    // Para e-mail parecido com o nome, transformar nome para lowercase, substituir espaços por ponto, remover caracteres especiais simples
    let emailFornecedor = nomeFornecedor
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
      .replace(/[^a-z0-9 ]/g, '') // remove caracteres especiais
      .replace(/\s+/g, '.') + '@exemplo.com.br';

    const fornecedor = await this.fornecedoresModel.create({
      nome: nomeFornecedor,
      cnpj: faker.string.numeric(14),
      email: emailFornecedor,
      telefone: faker.phone.number('(##) 9####-####'),
      endereco: isProd ? `Endereço Fixo ${i + 1}` : faker.location.streetAddress(),
    } as any);
    fornecedores.push(fornecedor);
  }

  // Equipamentos
  for (let i = 0; i < 12; i++) {
    const fornecedor = faker.helpers.arrayElement(fornecedores);
    const equipamento = await this.equipamentosModel.create({
      nome: isProd ? `Equipamento ${i + 1}` : faker.commerce.productName(),
      tipo: faker.helpers.arrayElement(['Máquina', 'Ferramenta', 'Veículo']),
      marca: isProd ? `Marca ${i + 1}` : faker.company.name(),
      modelo: isProd ? `Modelo ${i + 1}` : `Modelo-${faker.string.alphanumeric(5)}`,
      numeroDeSerie: faker.string.alphanumeric(10),
      estado: faker.helpers.arrayElement(['Novo', 'Usado', 'Revisado']),
      fornecedorId: fornecedor.id,
    } as any);
    equipamentos.push(equipamento);
  }

  // Obras com endereço e latitude/longitude preenchidos
  for (let i = 0; i < 12; i++) {
    const endereco = await this.enderecoModel.create({
      rua: isProd ? `Rua Fixa ${i + 1}` : faker.location.street(),
      numero: faker.string.numeric(3),
      bairro: isProd ? `Bairro Fixo ${i + 1}` : faker.location.street(),
      cidade: isProd ? `Cidade Fixa ${i + 1}` : faker.location.city(),
      estado: isProd ? `SP` : faker.location.state({ abbreviated: true }),
      cep: isProd ? `00000-000` : faker.location.zipCode(),
      complemento: isProd ? `Complemento Fixo ${i + 1}` : faker.location.secondaryAddress(),
    } as any);

    const dataInicio = faker.date.past({ years: 1 });
    const dataConclusao = faker.date.future({ years: 1, refDate: dataInicio });

    // Gerar gastos atualizados entre 40% e 100% do orçamento
    const orcamentoTotal = faker.number.int({ min: 500_000, max: 3_000_000 });
    const gastosAtualizados = parseFloat((orcamentoTotal * faker.number.float({ min: 0.4, max: 1, precision: 0.01 })).toFixed(2));

    // Gerar percentual concluído coerente entre 0 e 100
    const percentualConcluido = parseFloat(faker.number.float({ min: 0, max: 100, precision: 0.01 }).toFixed(2));

    const obra = await this.obrasModel.create({
      nome: isProd ? `Obra Fixa ${i + 1}` : `Obra ${faker.location.street()}`,
      descricao: faker.lorem.words(20),
      status: faker.helpers.arrayElement(['Planejada', 'Em andamento', 'Concluída', 'Paralisada']),
      data_inicio: dataInicio,
      data_conclusao: dataConclusao,
      responsavel: faker.person.fullName(),
      orcamento_total: orcamentoTotal,
      gastos_atualizados: gastosAtualizados,
      percentual_concluido: percentualConcluido,
      enderecoId: endereco.id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    } as any);

    obras.push(obra);
  }

  // Associações obras <-> fornecedores
  for (const obra of obras) {
    const selected = faker.helpers.arrayElements(fornecedores, 3);
    const uniqueFornecedores = new Set<number>();
    for (const fornecedor of selected) {
      if (!uniqueFornecedores.has(fornecedor.id)) {
        await this.obrasFornecedoresModel.create({
          obraId: obra.id,
          fornecedorId: fornecedor.id,
        });
        uniqueFornecedores.add(fornecedor.id);
      }
    }
  }

  // Associações obras <-> equipamentos
  for (const obra of obras) {
    const selected = faker.helpers.arrayElements(equipamentos, 3);
    const uniqueEquipamentos = new Set<number>();
    for (const equipamento of selected) {
      if (!uniqueEquipamentos.has(equipamento.id)) {
        await this.obrasEquipamentosModel.create({
          obraId: obra.id,
          equipamentoId: equipamento.id,
        });
        uniqueEquipamentos.add(equipamento.id);
      }
    }
  }

  // Etapas + Diários, preenchendo dataInicioReal e dataFimReal
  for (const obra of obras) {
    for (let j = 0; j < 2; j++) {
      const dataInicioPrevista = faker.date.future({ years: 1 });
      const dataFimPrevista = faker.date.future({ years: 1, refDate: dataInicioPrevista });
      const dataInicioReal = faker.date.between(dataInicioPrevista, dataFimPrevista);
      const dataFimReal = faker.date.between(dataInicioReal, dataFimPrevista);

      const etapa = await this.etapasModel.create({
        nome: `Etapa ${j + 1} da ${obra.nome}`,
        descricao: faker.lorem.words(20),
        dataInicioPrevista: dataInicioPrevista,
        dataFimPrevista: dataFimPrevista,
        dataInicioReal: dataInicioReal,
        dataFimReal: dataFimReal,
        status: faker.helpers.arrayElement(Object.values(EtapaStatus)),
        obraId: obra.id,
      } as any);

      await this.diariosModel.create({
        data: faker.date.recent().toISOString(),
        clima: faker.helpers.arrayElement(['Ensolarado', 'Nublado', 'Chuvoso']),
        atividadesExecutadas: faker.lorem.sentences(2),
        materiaisUtilizados: faker.commerce.product(),
        observacoes: faker.lorem.sentence(),
        obraId: obra.id,
      } as any);
    }
  }

  console.log(`✅ Seed ${isProd ? 'fixa (produção)' : 'aleatória (desenvolvimento)'} gerada com sucesso.`);
}
}