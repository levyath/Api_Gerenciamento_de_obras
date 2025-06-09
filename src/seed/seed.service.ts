import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { faker } from '@faker-js/faker';

// Enums
import { TipoVinculoObra } from 'src/domain/obra-responsavel-tecnico/enums/tipo-vinculo-obra.enum';
import { EtapaStatus } from 'src/domain/etapas-da-obra/entities/etapas-da-obra.entity';

// Entities
import { DiarioDeObra } from 'src/domain/diario-de-obra/entities/diario-de-obra.entity';
import { Endereco } from 'src/domain/enderecos/entities/endereco.entity';
import { Equipamentos } from 'src/domain/equipamentos/entities/equipamento.entity';
import { EtapasDaObra } from 'src/domain/etapas-da-obra/entities/etapas-da-obra.entity';
import { Fiscalizacoes } from 'src/domain/fiscalizacoes/entities/fiscalizacoes.entity';
import { Fornecedores } from 'src/domain/fornecedores/entities/fornecedores.entity';
import { Material } from 'src/domain/materiais/entities/material.entity';
import { ObraResponsavelTecnico } from 'src/domain/obra-responsavel-tecnico/entities/obra-responsavel-tecnico.entity';
import { ObrasEquipamentos } from 'src/domain/obra-equipamento/entities/obras-equipamentos.entity';
import { ObrasFiscalizacoes } from 'src/domain/obra-fiscalizacoes/entities/obras-fiscalizacoes.entity';
import { ObrasFornecedores } from 'src/domain/obra-fornecedor/entities/obras-fornecedores.entity';
import { Obras } from 'src/domain/obras/entities/obras.entity';
import { Relatorios } from 'src/domain/relatorios/entities/relatorios.entity';
import { ResponsavelTecnico } from 'src/domain/responsaveis-tecnicos/entities/responsavel-tecnico.entity';

// Constants
import {
  atividadesEObservacoes,
  complementosObra,
  dominiosEmail,
  equipamentosInfo,
  etapasPredefinidas,
  gerarTemplatesDescricaoObra,
  materiaisDeObra,
  nucleosTecnicos,
  opcoesDeFiscalizacao,
  prefixosComerciais,
  sobrenomesComuns,
  sufixosComerciais,
  templatesDeMaterial,
} from './seed.constants';
import { DiarioMaterial } from 'src/domain/diario-materiais/diario-material.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    // Models
    @InjectModel(DiarioDeObra) private diariosModel: typeof DiarioDeObra,
    @InjectModel(Endereco) private enderecoModel: typeof Endereco,
    @InjectModel(Equipamentos) private equipamentosModel: typeof Equipamentos,
    @InjectModel(EtapasDaObra) private etapasModel: typeof EtapasDaObra,
    @InjectModel(Fiscalizacoes) private fiscalizacoesModel: typeof Fiscalizacoes,
    @InjectModel(Fornecedores) private fornecedoresModel: typeof Fornecedores,
    @InjectModel(Material) private materialModel: typeof Material,
    @InjectModel(Obras) private obrasModel: typeof Obras,
    @InjectModel(ObraResponsavelTecnico) private obraResponsavelTecnicoModel: typeof ObraResponsavelTecnico,
    @InjectModel(ObrasEquipamentos) private obrasEquipamentosModel: typeof ObrasEquipamentos,
    @InjectModel(ObrasFiscalizacoes) private obrasFiscalizacoesModel: typeof ObrasFiscalizacoes,
    @InjectModel(ObrasFornecedores) private obrasFornecedoresModel: typeof ObrasFornecedores,
    @InjectModel(Relatorios) private relatoriosModel: typeof Relatorios,
    @InjectModel(ResponsavelTecnico) private responsavelTecnicoModel: typeof ResponsavelTecnico,
    @InjectModel(DiarioMaterial) private diarioMateriaisModel: typeof DiarioMaterial,

    // Services
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
    // A ordem de destruição é importante para respeitar as chaves estrangeiras
    await this.obrasFiscalizacoesModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obraResponsavelTecnicoModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasEquipamentosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.obrasFornecedoresModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.diariosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.etapasModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
    await this.relatoriosModel.destroy({ where: {}, truncate: true, cascade: true, force: true });
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
    console.log('Gerando seed de desenvolvimento...');
    await this.clearAll();
    await this.resetSequences();
    await this.seedData();
  }

  async seedProduction() {
    try {
      const count = await this.obrasModel.count();
      if (count > 0) {
        console.log('Seed já existente em produção. Nenhuma ação realizada.');
        return;
      }
      console.log('Banco de dados de produção vazio. Gerando seed inicial...');
      await this.seedData();
    } catch (error) {
        // Se a tabela não existe, o count() vai falhar. Isso é esperado na primeira execução.
        if (error.name === 'SequelizeDatabaseError') {
            console.log('Tabelas não encontradas. Gerando seed inicial para produção...');
            await this.seedData();
        } else {
            // Lança outros erros inesperados
            throw error;
        }
    }
  }

  async seedData() {
    const fornecedores: Fornecedores[] = [];
    const equipamentos: Equipamentos[] = [];
    const obras: Obras[] = [];
    const responsaveisTecnicos: ResponsavelTecnico[] = [];
    const fiscalizacoes: Fiscalizacoes[] = [];

    // Material
    for (let i = 0; i < 12; i++) {
      const template = faker.helpers.arrayElement(templatesDeMaterial);
      await this.materialModel.create({
        codigo: `MAT-${faker.string.alphanumeric(5).toUpperCase()}`,
        nome: template.nome,
        unidadeMedida: template.unidade,
        descricao: template.descricao,
        precoUnitario: faker.number.float({ min: 10, max: 800, precision: 0.01 }),
        fabricante: faker.helpers.arrayElement(template.fabricantes),
        modelo: faker.string.alphanumeric(10),
      } as any);
    }

    // ResponsavelTecnico
    for (let i = 0; i < 15; i++) {
      const responsavel = await this.responsavelTecnicoModel.create({
        nome: faker.person.fullName(),
        cpf: faker.string.numeric(11),
        registro_profissional: `CREA-${faker.string.numeric(6)}`,
        especialidade: faker.helpers.arrayElement(['Engenharia Civil', 'Arquitetura', 'Engenharia Elétrica']),
        ativo: true,
      });
      responsaveisTecnicos.push(responsavel);
    }

    // Fornecedores
    for (let i = 0; i < 12; i++) {
      let nomeFornecedor;
      const tipoNome = faker.number.int({ min: 1, max: 4 });
      switch (tipoNome) {
        case 1:
          nomeFornecedor = `${faker.helpers.arrayElement(prefixosComerciais)} ${faker.helpers.arrayElement(sobrenomesComuns)} ${faker.helpers.arrayElement(sufixosComerciais)}`;
          break;
        case 2:
          nomeFornecedor = `${faker.helpers.arrayElement(prefixosComerciais)} ${faker.helpers.arrayElement(sufixosComerciais)}`;
          break;
        case 3:
          nomeFornecedor = `${faker.helpers.arrayElement(sobrenomesComuns)} ${faker.helpers.arrayElement(sufixosComerciais)}`;
          break;
        case 4:
          nomeFornecedor = `${faker.helpers.arrayElement(prefixosComerciais)} ${faker.helpers.arrayElement(nucleosTecnicos)}`;
          break;
        default:
          nomeFornecedor = `Fornecedor Padrão ${i + 1} Ltda`;
      }

      const dominio = faker.helpers.arrayElement(dominiosEmail);
      const emailFornecedor = nomeFornecedor.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '.') + i + dominio;

      const fornecedor = await this.fornecedoresModel.create({
        nome: nomeFornecedor,
        cnpj: faker.string.numeric(14),
        email: emailFornecedor,
        telefone: faker.phone.number('(##) 9####-####'),
        endereco: faker.location.streetAddress(),
      } as any);
      fornecedores.push(fornecedor);
    }

     // Equipamentos
    for (let i = 0; i < 12; i++) {
      const fornecedor = faker.helpers.arrayElement(fornecedores);
      const equipamentoInfo = faker.helpers.arrayElement(equipamentosInfo);

      const equipamento = await this.equipamentosModel.create({
        nome: equipamentoInfo.nome,
        tipo: equipamentoInfo.tipo,
        marca: equipamentoInfo.marca,
        modelo: `Mod-${faker.string.alphanumeric(4).toUpperCase()}`,
        numeroDeSerie: faker.string.alphanumeric(10).toUpperCase(),
        estado: faker.helpers.arrayElement(['Novo', 'Usado', 'Revisado']),
        fornecedorId: fornecedor.id,
      } as any);
      equipamentos.push(equipamento);
    }

    // Obras
    for (let i = 0; i < 12; i++) {
      const endereco = await this.enderecoModel.create({
        rua: faker.location.street(),
        numero: faker.string.numeric(3),
        bairro: faker.location.street(),
        cidade: faker.location.city(),
        estado: faker.location.state({ abbreviated: true }),
        cep: faker.location.zipCode(),
        complemento: faker.helpers.arrayElement(complementosObra),
      } as any);

      const dataInicio = faker.date.past({ years: 1 });
      const dataConclusao = faker.date.future({ years: 1, refDate: dataInicio });
      const orcamentoTotal = faker.number.int({ min: 500_000, max: 3_000_000 });
      const gastosAtualizados = parseFloat((orcamentoTotal * faker.number.float({ min: 0.4, max: 1, precision: 0.01 })).toFixed(2));
      const percentualConcluido = parseFloat(faker.number.float({ min: 0, max: 100, precision: 0.01 }).toFixed(2));
      const nomeDaObra = `Construção do Edifício ${faker.word.words(2)}`;
      const templatesDescricao = gerarTemplatesDescricaoObra(nomeDaObra, endereco.cidade);
      const descricaoDaObra = faker.helpers.arrayElement(templatesDescricao);

      const obra = await this.obrasModel.create({
        nome: nomeDaObra,
        descricao: descricaoDaObra,
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

    // Fiscalizacoes e Relatorios
    const numeroDeFiscalizacoesACriar = 20;

    for (let i = 0; i < numeroDeFiscalizacoesACriar; i++) {
      const info = faker.helpers.arrayElement(opcoesDeFiscalizacao);
      const responsavel = faker.helpers.arrayElement(responsaveisTecnicos);
      
      const fiscalizacao = await this.fiscalizacoesModel.create({
        titulo: info.titulo,
        descricao: info.descricao,
        data_inicio: faker.date.past({ years: 1 }),
        data_fim: faker.date.recent(),
        status: faker.helpers.arrayElement(['Planejada', 'Em Andamento', 'Concluída']),
        responsavelTecnicoId: responsavel.id,
      } as any);
      fiscalizacoes.push(fiscalizacao);

      await this.relatoriosModel.create({
        titulo: info.relatorioTitulo,
        conteudo: info.relatorioConteudo,
        dataCriacao: new Date(),
        fiscalizacaoId: fiscalizacao.id,
      } as any);
    }

    // Associações
    for (const obra of obras) {
      // ObrasFornecedores
      const selectedFornecedores = faker.helpers.arrayElements(fornecedores, { min: 2, max: 4 });
      for (const fornecedor of selectedFornecedores) {
        await this.obrasFornecedoresModel.create({ obraId: obra.id, fornecedorId: fornecedor.id } as any);
      }

      // ObrasEquipamentos
      const selectedEquipamentos = faker.helpers.arrayElements(equipamentos, { min: 3, max: 5 });
      for (const equipamento of selectedEquipamentos) {
        await this.obrasEquipamentosModel.create({ obraId: obra.id, equipamentoId: equipamento.id });
      }

      // ObraResponsavelTecnico
      if (responsaveisTecnicos.length > 0) {
        const selectedResponsaveis = faker.helpers.arrayElements(responsaveisTecnicos, { min: 1, max: 2 });
        for (const responsavel of selectedResponsaveis) {
          const dataInicioVinculo = faker.date.between({
            from: obra.data_inicio,
            to: obra.data_conclusao || faker.date.future({ years: 1, refDate: obra.data_inicio })
          });
          const dataFimVinculo = faker.date.between({
            from: dataInicioVinculo,
            to: obra.data_conclusao || faker.date.future({ years: 2, refDate: dataInicioVinculo })
          });
          await this.obraResponsavelTecnicoModel.create({
            obraId: obra.id,
            responsavelTecnicoId: responsavel.id,
            tipo_vinculo: faker.helpers.arrayElement(Object.values(TipoVinculoObra)),
            data_inicio: dataInicioVinculo,
            data_fim: dataFimVinculo,
          } as any);
        }
      }

      // ObrasFiscalizacoes
      if (fiscalizacoes.length > 0 && faker.datatype.boolean()) {
        const amountToSelect = faker.number.int({
          min: 1,
          max: Math.min(3, fiscalizacoes.length),
        });
        const selectedFiscalizacoes = faker.helpers.arrayElements(fiscalizacoes, amountToSelect);
        for (const fiscalizacao of selectedFiscalizacoes) {
          await this.obrasFiscalizacoesModel.create({ obraId: obra.id, fiscalizacaoId: fiscalizacao.id } as any);
        }
      }
    }

    // EtapasDaObra e DiarioDeObra
    for (let j = 0; j < 18; j++) {
      const obraAleatoria = faker.helpers.arrayElement(obras);
      const dataInicioPrevista = faker.date.future({ years: 1 });
      const dataFimPrevista = faker.date.future({ years: 1, refDate: dataInicioPrevista });
      const etapaInfo = faker.helpers.arrayElement(etapasPredefinidas);

      await this.etapasModel.create({
        nome: `${etapaInfo.nome} da ${obraAleatoria.nome}`,
        descricao: etapaInfo.descricao,
        dataInicioPrevista,
        dataFimPrevista,
        dataInicioReal: faker.date.between({ from: dataInicioPrevista, to: dataFimPrevista }),
        dataFimReal: faker.date.between({ from: dataInicioPrevista, to: dataFimPrevista }),
        status: faker.helpers.arrayElement(Object.values(EtapaStatus)),
        obraId: obraAleatoria.id,
      } as any);

      const atividadeObs = faker.helpers.arrayElement(atividadesEObservacoes);
      const materiaisUsados = faker.helpers.arrayElements(materiaisDeObra, { min: 2, max: 5 }).join(', ');

      const diario = await this.diariosModel.create({
        data: faker.date.recent().toISOString().split('T')[0],
        clima: faker.helpers.arrayElement(['Ensolarado', 'Nublado', 'Chuvoso', 'Parcialmente Nublado']),
        atividadesExecutadas: atividadeObs.atividade,
        materiaisUtilizados: materiaisUsados,
        observacoes: atividadeObs.observacao,
        obraId: obraAleatoria.id,
      } as any);

      const selectedMateriais = faker.helpers.arrayElements(await this.materialModel.findAll(), faker.number.int({ min: 2, max: 3 }));
      for (const material of selectedMateriais) {
        await this.diarioMateriaisModel.create({
          diarioDeObraId: diario.id,
          materialId: material.id,
        } as any);
      }
    }

    const env = this.configService.get<string>('NODE_ENV');
    const isProd = env === 'production';
    console.log(`Seed ${isProd ? 'fixa (produção)' : 'aleatória (desenvolvimento)'} gerada com sucesso.`);
  }
}