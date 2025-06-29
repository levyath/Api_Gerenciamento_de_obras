export const materiaisDeObra: string[] = [
  'Cimento', 'Areia', 'Brita', 'Blocos de concreto', 'Tijolos', 'Verga metálica',
  'Argamassa', 'Tinta acrílica', 'Tubos PVC', 'Fios elétricos', 'Madeira de pinus',
  'Telhas cerâmicas', 'Pregos', 'Parafusos', 'Vedante de silicone'
];

export const etapasPredefinidas = [
  { nome: 'Fundação', descricao: 'Escavação e concretagem das sapatas e vigas baldrame.' },
  { nome: 'Estrutura', descricao: 'Montagem de formas e armação para pilares e lajes.' },
  { nome: 'Alvenaria', descricao: 'Levantamento de paredes com blocos cerâmicos ou de concreto.' },
  { nome: 'Cobertura', descricao: 'Instalação de telhado e calhas.' },
  { nome: 'Instalações Elétricas', descricao: 'Passagem de eletrodutos e fiação elétrica.' },
  { nome: 'Instalações Hidráulicas', descricao: 'Distribuição de tubos e conexões de água e esgoto.' },
  { nome: 'Acabamento', descricao: 'Revestimentos, pintura e detalhes finais.' },
  { nome: 'Serviços Preliminares', descricao: 'Limpeza do terreno, terraplanagem e montagem do canteiro de obras.' },
  { nome: 'Impermeabilização', descricao: 'Aplicação de mantas e produtos impermeabilizantes em áreas como lajes, banheiros e fundações.' },
  { nome: 'Contrapiso', descricao: 'Execução da camada de argamassa para nivelamento do piso antes do revestimento final.' },
  { nome: 'Esquadrias', descricao: 'Instalação de portas, janelas e portões.' },
  { nome: 'Revestimentos Internos', descricao: 'Aplicação de cerâmica, porcelanato, gesso e outros acabamentos nas paredes e pisos internos.' },
  { nome: 'Revestimentos Externos', descricao: 'Aplicação de reboco, textura, pastilhas ou outros acabamentos nas fachadas.' },
  { nome: 'Pintura', descricao: 'Aplicação de selador, massa corrida e tintas nas superfícies internas e externas.' },
  { nome: 'Paisagismo e Área Externa', descricao: 'Preparo do jardim, plantio de grama/plantas e execução de calçadas.' },
  { nome: 'Limpeza Pós-Obra', descricao: 'Remoção de entulhos e limpeza fina para a entrega da obra.' }
];

export const atividadesEObservacoes = [
  { atividade: 'Execução da fundação com sapatas isoladas.', observacao: 'O solo estava firme e permitiu boa concretagem.' },
  { atividade: 'Montagem de formas para pilares.', observacao: 'As formas foram niveladas corretamente e conferidas.' },
  { atividade: 'Levantamento de alvenaria no térreo.', observacao: 'Não houve desperdício de materiais nesta etapa.' },
  { atividade: 'Aplicação de massa corrida nas paredes internas.', observacao: 'A massa foi bem aplicada e já está pronta para pintura.' },
  { atividade: 'Instalação da rede hidráulica do banheiro.', observacao: 'Verificado bom encaixe das conexões e estanqueidade.' },
  { atividade: 'Passagem da fiação elétrica do primeiro andar.', observacao: 'Todos os circuitos foram identificados corretamente.' },
  { atividade: 'Colocação das telhas da cobertura.', observacao: 'A fixação foi reforçada devido à previsão de ventos fortes.' },
  { atividade: 'Terraplanagem do lote.', observacao: 'O platô principal foi nivelado conforme o projeto topográfico.' },
  { atividade: 'Concretagem da laje do segundo pavimento.', observacao: 'O concreto usinado chegou com o slump correto. A cura úmida foi iniciada.' },
  { atividade: 'Impermeabilização da laje da cobertura com manta asfáltica.', observacao: 'Teste de estanqueidade realizado por 72h sem apresentar vazamentos.' },
  { atividade: 'Instalação do quadro de disjuntores.', observacao: 'Quadro dimensionado com folga para futuros circuitos.' },
  { atividade: 'Execução do contrapiso da sala.', observacao: 'Aguardando o tempo de cura de 21 dias antes de assentar o porcelanato.' },
  { atividade: 'Instalação das janelas de alumínio.', observacao: 'Foi detectada uma pequena folga no vão da janela da cozinha, que precisou de mais espuma expansiva.' },
  { atividade: 'Assentamento do porcelanato no piso da cozinha.', observacao: 'Alinhamento e espaçamento das peças conferidos. Nivelamento perfeito.' },
  { atividade: 'Aplicação de reboco na fachada frontal.', observacao: 'A argamassa apresentou boa aderência. Superfície ficou regular.' },
  { atividade: 'Pintura da parede da suíte.', observacao: 'Foi necessário aplicar uma demão extra de tinta para cobrir totalmente a cor anterior.' },
  { atividade: 'Instalação de bancadas de granito na cozinha.', observacao: 'O recorte para a cuba ficou com um acabamento excelente.' },
  { atividade: 'Montagem do sistema de esgoto sanitário.', observacao: 'A inclinação dos tubos foi verificada para garantir o bom escoamento.' },
  { atividade: 'Limpeza final dos vidros e esquadrias.', observacao: 'Todos os adesivos de proteção foram removidos com sucesso.' }
];

export const complementosObra: (string | null)[] = [
  'Galpão principal', 'Área técnica', 'Lote 01', 'Lote 02',
  'Próximo ao depósito de materiais', 'Entrada pela lateral direita',
  'Ao lado do container de ferramentas', 'Próximo à guarita',
  'Fundos do terreno', 'Em frente à torre grua', 'Ao lado do refeitório',
  'Próximo ao barracão de apoio', null
];

export const equipamentosInfo = [
  { nome: 'Betoneira 400L', tipo: 'Máquina', marca: 'Menegotti' },
  { nome: 'Escavadeira Hidráulica', tipo: 'Veículo', marca: 'Caterpillar' },
  { nome: 'Martelete Elétrico', tipo: 'Ferramenta', marca: 'Bosch' },
  { nome: 'Guincho de Coluna', tipo: 'Máquina', marca: 'Schulz' },
  { nome: 'Compactador de Solo', tipo: 'Máquina', marca: 'Wacker Neuson' },
  { nome: 'Gerador a Diesel', tipo: 'Máquina', marca: 'Stemac' },
  { nome: 'Serra Circular de Bancada', tipo: 'Ferramenta', marca: 'Makita' },
  { nome: 'Plataforma Elevatória', tipo: 'Veículo', marca: 'JLG' },
  { nome: 'Cortadora de Piso', tipo: 'Ferramenta', marca: 'Norton Clipper' },
  { nome: 'Andaime Tubular', tipo: 'Ferramenta', marca: 'Locguel' },
  { nome: 'Vibrador de Concreto', tipo: 'Máquina', marca: 'CSM' },
  { nome: 'Trator de Esteira', tipo: 'Veículo', marca: 'Komatsu' },
  { nome: 'Caminhão Basculante', tipo: 'Veículo', marca: 'Mercedes-Benz' },
  { nome: 'Retroescavadeira', tipo: 'Veículo', marca: 'JCB' },
  { nome: 'Lixadeira de Parede', tipo: 'Ferramenta', marca: 'Vonder' },
  { nome: 'Bomba de Concreto', tipo: 'Máquina', marca: 'Putzmeister' },
  { nome: 'Torre de Iluminação', tipo: 'Máquina', marca: 'Pramac' },
  { nome: 'Policorte', tipo: 'Ferramenta', marca: 'Dewalt' },
  { nome: 'Rolo Compactador', tipo: 'Veículo', marca: 'Dynapac' },
  { nome: 'Máquina de Solda', tipo: 'Ferramenta', marca: 'Lincoln Electric' },
  { nome: 'Compressor de Ar', tipo: 'Máquina', marca: 'Chicago Pneumatic' },
  { nome: 'Nível a Laser', tipo: 'Ferramenta', marca: 'Stanley' },
  { nome: 'Minicarregadeira (Bobcat)', tipo: 'Veículo', marca: 'Bobcat' },
  { nome: 'Serra Mármore', tipo: 'Ferramenta', marca: 'Metabo' },
  { nome: 'Alisadora de Concreto (Bailarina)', tipo: 'Máquina', marca: 'Weber MT' },
  { nome: 'Lavadora de Alta Pressão', tipo: 'Ferramenta', marca: 'Kärcher' },
  { nome: 'Caminhão Betoneira', tipo: 'Veículo', marca: 'Scania' }
];

export const opcoesDeFiscalizacao = [
  {
    titulo: 'Inspeção de Segurança no Canteiro',
    descricao: 'Verificação do uso de EPIs, EPCs e sinalização adequada no local.',
    relatorioTitulo: 'Relatório de Segurança do Trabalho',
    relatorioConteudo: 'Foram observadas falhas pontuais no uso de capacetes em áreas de menor risco. Recomenda-se reforço nos diálogos diários de segurança (DDS).',
  },
  {
    titulo: 'Auditoria de Qualidade da Alvenaria',
    descricao: 'Análise do prumo, nível e alinhamento das paredes recém-construídas.',
    relatorioTitulo: 'Relatório de Qualidade da Alvenaria',
    relatorioConteudo: 'A alvenaria do bloco B está de acordo com as especificações do projeto. Nenhuma não conformidade encontrada.',
  },
  {
    titulo: 'Verificação das Instalações Elétricas Provisórias',
    descricao: 'Análise dos quadros de distribuição e da proteção dos cabos elétricos.',
    relatorioTitulo: 'Relatório de Instalações Elétricas',
    relatorioConteudo: 'A instalação provisória apresenta cabos expostos perto da área de carpintaria. Correção imediata solicitada e executada.',
  },
  {
    titulo: 'Fiscalização da Execução da Fundação',
    descricao: 'Inspeção da locação, armaduras e concretagem das sapatas.',
    relatorioTitulo: 'Relatório de Acompanhamento da Fundação',
    relatorioConteudo: 'A execução das sapatas está conforme o projeto estrutural. O concreto utilizado atingiu a resistência esperada no teste de corpo de prova.',
  },
  {
    titulo: 'Fiscalização de Impermeabilização de Lajes',
    descricao: 'Verificação da aplicação do sistema de impermeabilização (manta asfáltica, argamassa polimérica) e realização do teste de estanqueidade.',
    relatorioTitulo: 'Relatório de Impermeabilização',
    relatorioConteudo: 'Aplicação da manta asfáltica na laje da cobertura concluída com sucesso. Teste de estanqueidade de 72h iniciado.',
  },
  {
    titulo: 'Conferência de Níveis do Contrapiso',
    descricao: 'Medição das taliscas e níveis do contrapiso para garantir a planicidade necessária para o revestimento.',
    relatorioTitulo: 'Relatório de Nivelamento do Contrapiso',
    relatorioConteudo: 'Níveis do 3º pavimento estão de acordo com o projeto, com desvio máximo de 3mm. Liberado para assentamento do porcelanato.',
  },
  {
    titulo: 'Inspeção de Formas e Escoramento',
    descricao: 'Análise da montagem, travamento, alinhamento e segurança das formas e do escoramento antes da concretagem.',
    relatorioTitulo: 'Relatório de Formas e Escoramento',
    relatorioConteudo: 'Detectada falta de travamento em um painel de pilar no 4º andar. Equipe de carpintaria notificada para correção imediata.',
  },
  {
    titulo: 'Acompanhamento de Concretagem de Viga',
    descricao: 'Verificação do slump test, moldagem de corpos de prova e adensamento do concreto durante a concretagem.',
    relatorioTitulo: 'Relatório de Concretagem',
    relatorioConteudo: 'Slump de 12±2 cm, conforme solicitado. Corpos de prova devidamente moldados e identificados para ensaio aos 7 e 28 dias.',
  },
  {
    titulo: 'Verificação de Normas de Acessibilidade (NBR 9050)',
    descricao: 'Análise da execução de rampas, largura de portas, corrimãos e banheiros adaptados para Pessoas com Deficiência (PCD).',
    relatorioTitulo: 'Relatório de Acessibilidade',
    relatorioConteudo: 'A inclinação da rampa de acesso principal excede o máximo de 8,33% permitido pela norma. Projeto de adequação solicitado à equipe de engenharia.',
  },
  {
    titulo: 'Auditoria da Preparação para Pintura',
    descricao: 'Inspeção do lixamento, aplicação de massa corrida e fundo selador nas paredes internas.',
    relatorioTitulo: 'Relatório de Preparo de Pintura',
    relatorioConteudo: 'Superfícies do Bloco A apresentam boa uniformidade e estão prontas. Liberado para aplicação da primeira demão de tinta.',
  },
  {
    titulo: 'Teste de Pressão da Rede Hidráulica',
    descricao: 'Verificação de vazamentos na tubulação de água fria e quente, submetendo a rede a uma pressão controlada.',
    relatorioTitulo: 'Relatório de Estanqueidade Hidráulica',
    relatorioConteudo: 'Rede do 5º andar permaneceu estável sob pressão de 6 kgf/cm² por 2 horas. Nenhuma queda detectada. Aprovado.',
  },
  {
    titulo: 'Inspeção do Sistema de Drenagem Pluvial',
    descricao: 'Análise da instalação de calhas, ralos e tubulação de descida de águas pluviais.',
    relatorioTitulo: 'Relatório de Drenagem Pluvial',
    relatorioConteudo: 'Caimento das calhas do telhado principal está insuficiente, causando acúmulo de água. Reinstalação necessária.',
  },
  {
    titulo: 'Gestão de Resíduos no Canteiro',
    descricao: 'Verificação da segregação, armazenamento e descarte adequado dos resíduos da construção (Classe A, B, C, D).',
    relatorioTitulo: 'Relatório de Gestão Ambiental',
    relatorioConteudo: 'A segregação de resíduos está sendo feita corretamente, porém a baia de madeira (Classe A) está sobrecarregada. Solicitar coleta.',
  },
  {
    titulo: 'Conferência de Esquadrias de Alumínio',
    descricao: 'Inspeção da instalação, vedação e funcionamento de janelas e portas de alumínio.',
    relatorioTitulo: 'Relatório de Esquadrias',
    relatorioConteudo: 'Janelas do 2º pavimento instaladas e vedadas corretamente. Apresentam bom funcionamento de abertura e fechamento.',
  },
  {
    titulo: 'Verificação do Sistema de Proteção Contra (SPDA)',
    descricao: 'Análise da instalação dos captores, cabos de descida e malha de aterramento do para-raios.',
    relatorioTitulo: 'Relatório do SPDA',
    relatorioConteudo: 'Continuidade elétrica dos condutores está OK. Medição de aterramento apresentou valor abaixo de 10 ohms. Sistema aprovado.',
  },
  {
    titulo: 'Fiscalização do Rejuntamento de Pisos',
    descricao: 'Análise da aplicação e acabamento do rejunte em pisos cerâmicos e porcelanatos.',
    relatorioTitulo: 'Relatório de Rejuntamento',
    relatorioConteudo: 'Rejunte do banheiro da suíte master apresenta falhas e falta de uniformidade. Refazer o serviço na área apontada.',
  },
  {
    titulo: 'Auditoria de Documentação da Obra',
    descricao: 'Verificação da disponibilidade e atualização de alvarás, licenças, projetos e Diário de Obras (DO).',
    relatorioTitulo: 'Relatório de Documentação',
    relatorioConteudo: 'Alvará de construção e licença ambiental estão válidos e afixados em local visível. Diário de Obras preenchido corretamente.',
  },
  {
    titulo: 'Inspeção do Chapisco e Emboço',
    descricao: 'Verificação da aderência e espessura da argamassa de revestimento externo.',
    relatorioTitulo: 'Relatório de Revestimento Externo',
    relatorioConteudo: 'O emboço da fachada leste apresenta boa aderência e espessura uniforme. Liberado para aplicação do reboco.',
  },
  {
    titulo: 'Verificação de Instalações de Gás',
    descricao: 'Inspeção da tubulação, conexões e pontos de consumo da rede de gás, incluindo teste de estanqueidade.',
    relatorioTitulo: 'Relatório de Instalações de Gás',
    relatorioConteudo: 'Teste de estanqueidade com manômetro não apresentou queda de pressão. Rede de gás do Bloco C está íntegra e aprovada.',
  },
  {
    titulo: 'Instalação de Bancadas de Granito',
    descricao: 'Conferência de nível, prumo e fixação das bancadas de pias e balcões.',
    relatorioTitulo: 'Relatório de Bancadas de Granito',
    relatorioConteudo: 'Bancada da cozinha do apartamento 101 está fora de nível. Necessário calçar e nivelar novamente.',
  },
  {
    titulo: 'Controle Tecnológico do Aço',
    descricao: 'Verificação dos certificados de qualidade do aço recebido e da correta execução de dobras e armação.',
    relatorioTitulo: 'Relatório de Controle do Aço',
    relatorioConteudo: 'O lote de aço CA-50 recebido hoje possui certificado de qualidade correspondente. Amostras enviadas para ensaio de tração.',
  },
  {
    titulo: 'Fiscalização de Drywall',
    descricao: 'Análise da montagem da estrutura de perfis, plaqueamento e tratamento de juntas das paredes de drywall.',
    relatorioTitulo: 'Relatório de Paredes de Drywall',
    relatorioConteudo: 'Estrutura e plaqueamento da sala de reuniões estão conforme as recomendações do fabricante. Juntas prontas para o lixamento.',
  },
  {
    titulo: 'Inspeção do Sistema de Combate a Incêndio',
    descricao: 'Verificação de hidrantes, mangueiras, extintores e sinalização de emergência.',
    relatorioTitulo: 'Relatório de Combate a Incêndio',
    relatorioConteudo: 'Extintores dentro da validade e com pressão adequada. O hidrante do 3º subsolo está com o acesso obstruído por materiais. Liberar a área.',
  },
  {
    titulo: 'Conferência do Gabarito da Obra',
    descricao: 'Análise da locação dos eixos e pilares no gabarito de madeira antes do início da fundação.',
    relatorioTitulo: 'Relatório de Locação da Obra',
    relatorioConteudo: 'Medições dos eixos e níveis do gabarito conferem com o projeto de locação. Liberado para iniciar a escavação das sapatas.',
  },
  {
    titulo: 'Verificação do Isolamento Acústico',
    descricao: 'Inspeção da aplicação de materiais de isolamento acústico em pisos e paredes, conforme norma de desempenho NBR 15575.',
    relatorioTitulo: 'Relatório de Desempenho Acústico',
    relatorioConteudo: 'Manta acústica entre os pavimentos foi instalada corretamente antes do contrapiso. Conformidade com o projeto verificada.',
  },
  {
    titulo: 'Auditoria de Limpeza Pós-Obra',
    descricao: 'Verificação final da remoção de detritos, poeira e respingos de tinta para a entrega da unidade.',
    relatorioTitulo: 'Relatório de Limpeza Final',
    relatorioConteudo: 'Limpeza geral do apartamento 302 foi concluída. Encontradas pequenas manchas de tinta nos vidros. Solicitar retoque da limpeza fina.',
  },
  {
    titulo: 'Inspeção de Cobertura e Telhado',
    descricao: 'Análise da estrutura de madeira ou metálica, fixação das telhas e sistema de vedação (rufos e cumeeiras).',
    relatorioTitulo: 'Relatório de Cobertura',
    relatorioConteudo: 'Estrutura e telhas cerâmicas do telhado do salão de festas estão bem fixadas. Rufos instalados corretamente. Serviço aprovado.',
  },
];

export const dominiosEmail: string[] = [
  '@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com.br'
];

export const prefixosComerciais: string[] = [
  'Construtora', 'Engemax', 'Tecno-Obra', 'Soluções', 'Concreforte',
  'Metalúrgica', 'Eletro-Hidro', 'Terraplanagem', 'Mega Estruturas', 'Projeta',
  'Alfa', 'Verde', 'Central do', 'Rei do', 'Casa do'
];

export const nucleosTecnicos: string[] = [
  'Aço', 'Concreto', 'Parafuso', 'Tijolo', 'Cimento', 'Andaimes',
  'Equipamento', 'Trator', 'Gerador', 'Material Elétrico'
];

export const sobrenomesComuns: string[] = [
  'Silva', 'Costa', 'Ribeiro', 'Souza', 'Lima', 'Ferreira', 'Almeida', 'Pereira'
];

export const sufixosComerciais: string[] = [
  'Ltda', 'Engenharia', 'S.A.', 'Comércio e Serviços',
  'Materiais para Construção', 'Soluções em Engenharia', 'e Representações'
];

export const templatesDeMaterial = [
  { nome: 'Cimento Portland CP II-F-32', unidade: 'Saco 50kg', fabricantes: ['Votorantim (Votoran)', 'InterCement', 'Tupi', 'Mizu'], descricao: 'Cimento para uso geral em concretos e argamassas.' },
  { nome: 'Areia Média Lavada', unidade: 'm³', fabricantes: ['Extração Local', 'Areial do Vale', 'Depósito Central'], descricao: 'Agregado miúdo para fabricação de concreto e argamassa.' },
  { nome: 'Brita 1', unidade: 'm³', fabricantes: ['Pedreira União', 'Extração Local', 'Votorantim Cimentos'], descricao: 'Agregado graúdo para concretos estruturais e vigas.' },
  { nome: 'Vergalhão de Aço CA-50 10mm', unidade: 'Barra 12m', fabricantes: ['Gerdau', 'ArcelorMittal', 'CSN'], descricao: 'Barra de aço nervurada para armaduras de concreto armado.' },
  { nome: 'Vergalhão de Aço CA-60 4.2mm', unidade: 'Rolo (kg)', fabricantes: ['Gerdau', 'ArcelorMittal', 'Belgo'], descricao: 'Aço de alta resistência para fabricação de estribos e armaduras leves.' },
  { nome: 'Tijolo Cerâmico 8 Furos (9x19x19cm)', unidade: 'Milheiro', fabricantes: ['Olaria São José', 'Cerâmica Vermelha', 'Forte Tijolo'], descricao: 'Tijolo para vedação em alvenaria convencional.' },
  { nome: 'Bloco de Concreto Estrutural (14x19x39cm)', unidade: 'Peça', fabricantes: ['Blocon', 'PrestoBloco', 'Concrebloco'], descricao: 'Bloco para uso em alvenaria estrutural.' },
  { nome: 'Argamassa Pronta para Reboco Externo', unidade: 'Saco 20kg', fabricantes: ['Votorantim (Votomassa)', 'Quartzolit', 'Kerakoll'], descricao: 'Mistura pronta para revestimento de fachadas, com aditivos impermeabilizantes.' },
  { nome: 'Tubo de PVC Soldável para Água Fria 25mm (3/4")', unidade: 'Barra 6m', fabricantes: ['Tigre', 'Amanco', 'Krona'], descricao: 'Tubo para distribuição de água fria em ramais prediais.' },
  { nome: 'Tubo de PVC para Esgoto 100mm', unidade: 'Barra 6m', fabricantes: ['Tigre', 'Amanco', 'Krona'], descricao: 'Tubo para coleta e condução de esgoto sanitário e águas pluviais.' },
  { nome: 'Eletroduto Flexível Corrugado 3/4"', unidade: 'Rolo 50m', fabricantes: ['Tigre', 'Amanco', 'Adtex'], descricao: 'Conduíte para passagem de fiação elétrica em lajes e paredes.' },
  { nome: 'Cabo Elétrico Flexível 2,5mm²', unidade: 'Rolo 100m', fabricantes: ['Prysmian', 'Cobrecom', 'Corfio', 'Sil'], descricao: 'Cabo para circuitos de tomadas de uso geral (TUG). Antichama.' },
  { nome: 'Manta Asfáltica Poliéster 3mm', unidade: 'Rolo 10m²', fabricantes: ['Viapol', 'Sika', 'Denver'], descricao: 'Sistema de impermeabilização para lajes, telhados e áreas molhadas.' },
  { nome: 'Argamassa Colante AC-III Branca', unidade: 'Saco 20kg', fabricantes: ['Quartzolit', 'Votorantim (Votomassa)', 'Kerakoll'], descricao: 'Argamassa de alta aderência para assentamento de porcelanatos, piscinas e fachadas.' },
  { nome: 'Placa de Gesso Acartonado (Drywall) ST 12,5mm', unidade: 'Peça (1,20x1,80m)', fabricantes: ['Placo', 'Knauf', 'Gypsum'], descricao: 'Placa standard para execução de paredes, forros e revestimentos secos.' },
  { nome: 'Tinta Acrílica Fosca Branca Standard', unidade: 'Lata 18L', fabricantes: ['Suvinil', 'Coral', 'Sherwin-Williams', 'Lukscolor'], descricao: 'Tinta para pintura de paredes internas e externas com acabamento fosco.' },
  { nome: 'Massa Corrida PVA', unidade: 'Lata 25kg', fabricantes: ['Suvinil', 'Coral', 'Eucatex'], descricao: 'Massa para nivelamento e correção de imperfeições em superfícies internas.' },
  { nome: 'Chapa de Madeira Compensada Plastificada 18mm', unidade: 'Peça (2,20x1,10m)', fabricantes: ['Madeireira Santa Fé', 'Leo Madeiras', 'Gmad'], descricao: 'Chapa para montagem de formas de concreto que exigem acabamento aparente.' },
];

export const gerarTemplatesDescricaoObra = (nomeDaObra: string, cidade: string): string[] => {
  return [
    `Projeto detalhado para a ${nomeDaObra}, localizado em ${cidade}. Foco em acabamentos de alto padrão e sustentabilidade.`,
    `Esta descrição refere-se ao plano de execução da ${nomeDaObra}, detalhando todas as fases construtivas.`,
    `Construção e gerenciamento completo da ${nomeDaObra}. O projeto inclui fundação, alvenaria estrutural, instalações elétricas e hidráulicas.`,
    `Reforma e ampliação do empreendimento ${nomeDaObra}, visando a modernização de suas instalações e otimização de espaço.`,
    `Execução da ${nomeDaObra}, seguindo rigorosamente as normas técnicas ABNT e o plano de segurança do trabalho.`,
    `O objetivo principal da ${nomeDaObra} é entregar uma estrutura moderna e funcional na região de ${cidade}.`,
    `Este documento delineia o escopo completo para a ${nomeDaObra}, desde a preparação do terreno até a entrega final das chaves.`,
    `Fase de fundações da ${nomeDaObra}: inclui escavação, concretagem de sapatas e impermeabilização da base.`,
    `Planejamento de alvenaria e superestrutura para a ${nomeDaObra}, com foco na otimização de materiais e mão de obra.`,
    `Desenvolvimento do projeto de instalações elétricas e de dados para a ${nomeDaObra}, garantindo conformidade e escalabilidade futura.`,
    `As instalações hidrossanitárias da ${nomeDaObra} foram projetadas para máxima eficiência no consumo e conservação de água.`,
    `Gerenciamento de cronograma para a ${nomeDaObra}, utilizando o método do caminho crítico para otimizar os prazos de entrega.`,
    `Plano de comunicação para a ${nomeDaObra}, definindo o fluxo de informações entre a equipe, stakeholders e o cliente final.`,
    `Controle de qualidade implementado em todas as fases da ${nomeDaObra}, com inspeções diárias e relatórios de conformidade.`,
    `Protocolo de segurança do trabalho (SST) implementado no canteiro da ${nomeDaObra}, com foco em prevenção de acidentes e uso de EPIs.`,
    `Logística de canteiro de obras para a ${nomeDaObra}, incluindo gestão de recebimento, armazenamento e distribuição de materiais.`,
    `Processo de aquisição e qualificação de fornecedores para os materiais a serem utilizados na ${nomeDaObra}.`,
    `Obtenção de todas as licenças e alvarás necessários para a completa legalidade da ${nomeDaObra} junto à prefeitura de ${cidade}.`,
    `A ${nomeDaObra} segue estritamente o código de obras e as regulamentações urbanísticas vigentes de ${cidade}.`,
    `Implementação de práticas de construção sustentável na ${nomeDaObra}, com ênfase na gestão de resíduos e reciclagem.`,
    `Utilização de materiais inovadores e de baixo impacto ambiental no desenvolvimento e execução da ${nomeDaObra}.`,
    `O plano de acabamentos para a ${nomeDaObra} inclui a especificação de revestimentos cerâmicos, louças, metais e pintura.`,
    `Análise de riscos do projeto ${nomeDaObra}, identificando potenciais problemas e desenvolvendo planos de mitigação eficazes.`,
    `Coordenação das equipes de subcontratados no canteiro da ${nomeDaObra} para garantir a sinergia entre as diferentes frentes de trabalho.`,
    `Relatório de progresso semanal para a ${nomeDaObra}, detalhando avanços percentuais, desafios encontrados e próximos passos.`,
    `Projeto de paisagismo e desenvolvimento de áreas externas integrado ao escopo da ${nomeDaObra}.`,
    `Sistema de climatização e ventilação para a ${nomeDaObra}, projetado para garantir o conforto térmico e a eficiência energética.`,
    `Memorial descritivo da ${nomeDaObra}, detalhando todos os materiais, componentes e técnicas a serem empregados.`,
    `O escopo da ${nomeDaObra} envolve a construção de uma edificação de múltiplos pavimentos com finalidade estritamente comercial.`,
    `Este projeto, ${nomeDaObra}, foca na reabilitação de uma estrutura histórica em ${cidade}, preservando suas características originais.`,
    `Desenvolvimento de infraestrutura completa para o loteamento ${nomeDaObra}, incluindo terraplanagem, pavimentação e saneamento básico.`,
    `Acompanhamento topográfico e geotécnico contínuo durante as fases de terraplanagem e fundação da ${nomeDaObra}.`,
    `Plano de comissionamento e entrega da ${nomeDaObra}, com testes rigorosos de todos os sistemas antes da ocupação final.`,
    `Estudo de viabilidade técnica e ambiental realizado previamente para a concepção e aprovação da ${nomeDaObra}.`,
    `Gestão de documentos e registros da ${nomeDaObra}, incluindo plantas "as-built", licenças e todos os diários de obra.`,
    `A ${nomeDaObra} representa um marco arquitetônico para a cidade de ${cidade}, com design arrojado e soluções inovadoras.`
  ];
};