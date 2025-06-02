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
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';
import { ObraResponsavelTecnico } from 'src/domain/obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { Fiscalizacoes } from 'src/domain/fiscalizacoes/entities/fiscalizacoes.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
import { Material } from 'src/domain/materiais/entities/material.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Obras) private obrasModel: typeof Obras,
    @InjectModel(Fornecedores) private fornecedoresModel: typeof Fornecedores,
    @InjectModel(Equipamentos) private equipamentosModel: typeof Equipamentos,
    @InjectModel(Endereco) private enderecoModel: typeof Endereco,
    @InjectModel(EtapasDaObra) private etapasModel: typeof EtapasDaObra,
    @InjectModel(DiarioDeObra) private diariosModel: typeof DiarioDeObra,
    @InjectModel(ResponsavelTecnico) private responsavelTecnicoModel: typeof ResponsavelTecnico,
    @InjectModel(Fiscalizacoes) private fiscalizacoesModel: typeof Fiscalizacoes,
    @InjectModel(Relatorios) private relatoriosModel: typeof Relatorios,
    @InjectModel(Material) private materialModel: typeof Material,
    @InjectModel(ObrasEquipamentos) private obrasEquipamentosModel: typeof ObrasEquipamentos,
    @InjectModel(ObrasFornecedores) private obrasFornecedoresModel: typeof ObrasFornecedores,
    @InjectModel(ObraResponsavelTecnico) private obraResponsavelTecnicoModel: typeof ObraResponsavelTecnico,
    @InjectModel(ObrasFiscalizacoes) private obrasFiscalizacoesModel: typeof ObrasFiscalizacoes,
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
    // Apagar em ordem de dependência para evitar erros de chave estrangeira
    await this.obrasFiscalizacoesModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obraResponsavelTecnicoModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasEquipamentosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasFornecedoresModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.diariosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.etapasModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.relatoriosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    
    // Agora apagar as tabelas principais
    await this.fiscalizacoesModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.responsavelTecnicoModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.materialModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
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
      'etapas_obra_id_seq',
      'diarios_obra_id_seq', 
      'responsaveis_tecnicos_id_seq',
      'fiscalizacoes_id_seq',
      'relatorios_id_seq',
      'materiais_id_seq',
      'obra_responsavel_tecnico_id_seq',
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
    const responsaveisTecnicos: ResponsavelTecnico[] = [];
    const fiscalizacoes: Fiscalizacoes[] = [];

    // Materiais
    for (let i = 0; i < 20; i++) {
      await this.materialModel.create({
        codigo: `MAT-${faker.string.alphanumeric(5).toUpperCase()}`,
        nome: isProd ? `Material ${i + 1}` : faker.commerce.productName(),
        unidadeMedida: faker.helpers.arrayElement(['Saco', 'Metro', 'Kg', 'Unidade']),
        descricao: isProd ? `Descrição do material ${i + 1}` : faker.commerce.productDescription(),
        precoUnitario: faker.number.float({ min: 10, max: 500, precision: 0.01 }),
        fabricante: isProd ? `Fabricante ${i + 1}` : faker.company.name(),
        modelo: faker.string.alphanumeric(10),
      } as any);
    }

    // Responsáveis Técnicos
    for (let i = 0; i < 5; i++) {
        const responsavel = await this.responsavelTecnicoModel.create({
            nome: isProd ? `Responsável ${i + 1}`: faker.person.fullName(),
            cpf: faker.string.numeric(11),
            registro_profissional: `CREA-${faker.string.numeric(6)}`,
            especialidade: faker.helpers.arrayElement(['Engenharia Civil', 'Arquitetura', 'Engenharia Elétrica']),
            ativo: true,
        });
        responsaveisTecnicos.push(responsavel);
    }
    
    // Fornecedores
    for (let i = 0; i < 12; i++) {
      let nomeFornecedor = isProd ? `Fornecedor ${i + 1}` : faker.company.name();
      let emailFornecedor = nomeFornecedor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '.') + '@exemplo.com.br';

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

    // Obras
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
      const orcamentoTotal = faker.number.int({ min: 500_000, max: 3_000_000 });
      const gastosAtualizados = parseFloat((orcamentoTotal * faker.number.float({ min: 0.4, max: 1, precision: 0.01 })).toFixed(2));
      const percentualConcluido = parseFloat(faker.number.float({ min: 0, max: 100, precision: 0.01 }).toFixed(2));

      const obra = await this.obrasModel.create({
        nome: isProd ? `Obra Fixa ${i + 1}` : `Obra ${faker.location.street()}`,
        descricao: faker.lorem.words(20),
        status: faker.helpers.arrayElement(['Planejada', 'Em andamento', 'Concluída', 'Paralisada']),
        data_inicio: dataInicio,
        data_conclusao: dataConclusao,
        orcamento_total: orcamentoTotal,
        gastos_atualizados: gastosAtualizados,
        percentual_concluido: percentualConcluido,
        enderecoId: endereco.id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      } as any);
      obras.push(obra);
    }

    // Fiscalizações e Relatórios
    for (let i = 0; i < 8; i++) {
        const responsavel = faker.helpers.arrayElement(responsaveisTecnicos);
        const fiscalizacao = await this.fiscalizacoesModel.create({
            titulo: `Fiscalização ${i + 1}`,
            descricao: faker.lorem.sentence(),
            data_inicio: faker.date.past(),
            data_fim: faker.date.future(),
            status: faker.helpers.arrayElement(['Planejada', 'Em Andamento', 'Concluída']),
            responsavelTecnicoId: responsavel.id,
        } as any);
        fiscalizacoes.push(fiscalizacao);

        await this.relatoriosModel.create({
            titulo: `Relatório da ${fiscalizacao.titulo}`,
            conteudo: faker.lorem.paragraphs(3),
            data_criacao: new Date(),
            fiscalizacaoId: fiscalizacao.id,
        } as any);
    }

    // Associações
    for (const obra of obras) {
      // Obras <-> Fornecedores
      const selectedFornecedores = faker.helpers.arrayElements(fornecedores, 3);
      for (const fornecedor of selectedFornecedores) {
          await this.obrasFornecedoresModel.create({ obraId: obra.id, fornecedorId: fornecedor.id });
      }

      // Obras <-> Equipamentos
      const selectedEquipamentos = faker.helpers.arrayElements(equipamentos, 3);
      for (const equipamento of selectedEquipamentos) {
          await this.obrasEquipamentosModel.create({ obraId: obra.id, equipamentoId: equipamento.id });
      }
      
      // Obras <-> Responsáveis Técnicos
      const selectedResponsaveis = faker.helpers.arrayElements(responsaveisTecnicos, 2);
      for (const responsavel of selectedResponsaveis) {
          // Define uma data de início e fim para a responsabilidade do técnico na obra
          const dataInicio = faker.date.past({ years: 1 }); // Inicia em algum momento no último ano
          const dataFim = faker.date.future({ years: 1, refDate: dataInicio }); // Termina em algum momento no próximo ano, após a data de início

          await this.obraResponsavelTecnicoModel.create({
              obraId: obra.id,
              responsavelTecnicoId: responsavel.id,
              data_inicio: dataInicio, // Adicionado
              data_fim: dataFim,         // Adicionado
          });
      }
      
      // Obras <-> Fiscalizações
      const selectedFiscalizacoes = faker.helpers.arrayElements(fiscalizacoes, 1);
      for (const fiscalizacao of selectedFiscalizacoes) {
          await this.obrasFiscalizacoesModel.create({ obraId: obra.id, fiscalizacaoId: fiscalizacao.id });
      }

      // Etapas e Diários
      for (let j = 0; j < 2; j++) {
        const dataInicioPrevista = faker.date.future({ years: 1 });
        const dataFimPrevista = faker.date.future({ years: 1, refDate: dataInicioPrevista });

        await this.etapasModel.create({
          nome: `Etapa ${j + 1} da ${obra.nome}`,
          descricao: faker.lorem.words(20),
          dataInicioPrevista,
          dataFimPrevista,
          dataInicioReal: faker.date.between({ from: dataInicioPrevista, to: dataFimPrevista }),
          dataFimReal: faker.date.between({ from: dataInicioPrevista, to: dataFimPrevista }),
          status: faker.helpers.arrayElement(Object.values(EtapaStatus)),
          obraId: obra.id,
        } as any);

        await this.diariosModel.create({
          data: faker.date.recent().toISOString().split('T')[0], // Formato YYYY-MM-DD
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