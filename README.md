# Gerenciamento de Obras Públicas

Esta API foi criada para gerenciar diversos elementos que compôem uma obra pública.

**Tecnologias utilizadas**:
- [NestJS](https://github.com/nestjs/nest)
- [Sequelize](https://github.com/sequelize/sequelize)
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)

**Entidades gerenciadas**:
- Diários de Obra
- Endereços
- Equipamentos
- Etapas da Obra
- Fiscalizações
- Fornecedores
- Materiais
- Obras
- Relatórios
- Responsáveis Técnicos

# Configuração do Ambiente

Para rodar o projeto, precisamos garantir que a ferramenta **Docker** esteja instalada corretamente em seu ambiente para rodar o `docker-compose.yml`.

É possível validar a existência do Docker em seu ambiente através do comando:
```
$ docker --version
```

- Se o output retornar `Docker version [versão.do.docker], build [hash-da-build]`, o docker está configurado **corretamente** em seu ambiente.
- Se o output retornar `docker: command not found`, o docker **não está instalado** em seu sistema.

Caso precise de apoio para instalar o Docker, confira as [documentações de apoio](#documentações-de-apoio) antes de prosseguir para garantir o funcionamento da aplicação.

# Configuração do Projeto

Para configurarmos o projeto, siga os passos a seguir:

1. Clone o repositório para sua maquina local
```
$ git clone https://github.com/levyath/Api_Gerenciamento_de_obras.git
```
2. Crie o arquivo .env na raiz do projeto (/Api_Gerenciamento_de_obras/.env) e popule ele com os valores correspondentes.
```
$ cd Api_Gerenciamento_de_obras

$ nano .env

//dentro do nano
NODE_ENV=development
DB_HOST=[nome-host-banco]
DB_PORT=5432
DB_EXT_PORT=15432
DB_DATABASE=[nome-database]
DB_USER=[nome-user]
DB_PASSWORD=[senha-user]
TOKEN_VALIDATOR_API_URL=http://localhost:3001/auth/validate

//salvar e fechar o arquivo
Ctrl+S + Ctrl+X
```
3. Abra um terminal no diretório raiz do projeto, e rode o docker-compose.yml com o comando abaixo:
```
$ docker compose up -d
[+] Running 4/4
 ✔ Network api_gerenciamento_de_obras_default Created 0.1s 
 ✔ Volume "api_gerenciamento_de_obras_pgdata" Created 0.0s 
 ✔ Container api_gerenciamento_de_obras-db-1 Started 6.7s 
 ✔ Container api_gerenciamento_de_obras-api-1 Started 6.8s
```

# Autenticação

- documentar como fazer a autenticação com a API https://github.com/CainaZumaa/controle-users/tree/dev

# Documentação da API

A documentação dos endpoints está sendo feita através do Swagger.

Link para o painel: `http://127.0.0.1:3000/docs`

## Endpoints

<details>
  <summary>Endereços</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/enderecos</td>
        <td align="center">Listar todos os endereços cadastrados</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/obras/{id}/endereco</td>
        <td align="center">Criar um novo endereço para uma obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{id}/endereco</td>
        <td align="center">Buscar o endereço de uma obra</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/obras/{id}/endereco</td>
        <td align="center">Atualizar o endereço de uma obra</td>
      </tr>
      </tbody>
  </table>
</details>

<details>
  <summary>Obras</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras</td>
        <td align="center">Listar todas as obras</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/obras</td>
        <td align="center">Criar uma nova obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{id}</td>
        <td align="center">Buscar uma obra por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/obras/{id}</td>
        <td align="center">Atualizar uma obra existente</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/obras/{id}</td>
        <td align="center">Remover uma obra por ID</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Fornecedores</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fornecedores</td>
        <td align="center">Listar todos os fornecedores</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/fornecedores</td>
        <td align="center">Criar um novo fornecedor</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fornecedores/{id}</td>
        <td align="center">Buscar fornecedor por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/fornecedores/{id}</td>
        <td align="center">Atualizar fornecedor existente</td>
      </tr>
      <tr>
        <td align="center">PATCH</td>
        <td align="center">/api/fornecedores/{id}</td>
        <td align="center">Atualizar parcialmente o campo ativo do fornecedor</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/fornecedores/{id}</td>
        <td align="center">Remover fornecedor por ID</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{id}/fornecedores</td>
        <td align="center">Listar fornecedores vinculados a uma obra pelo ID</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Equipamentos</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/equipamentos</td>
        <td align="center">Listar todos os equipamentos</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/equipamentos</td>
        <td align="center">Criar um novo equipamento</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/equipamentos/{id}</td>
        <td align="center">Buscar equipamento por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/equipamentos/{id}</td>
        <td align="center">Atualizar um equipamento existente</td>
      </tr>
      <tr>
        <td align="center">PATCH</td>
        <td align="center">/api/equipamentos/{id}</td>
        <td align="center">Atualizar as obras associadas a um equipamento</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/equipamentos/{id}</td>
        <td align="center">Remover equipamento por ID</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{id}/equipamentos</td>
        <td align="center">Listar equipamentos de uma obra pelo ID da obra</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Etapas da Obra</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/obras/{idObra}/etapas</td>
        <td align="center">Criar uma nova etapa para uma obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{idObra}/etapas</td>
        <td align="center">Listar todas as etapas de uma obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{idObra}/etapas/{etapaId}</td>
        <td align="center">Buscar uma etapa específica de uma obra por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/obras/{idObra}/etapas/{etapaId}</td>
        <td align="center">Atualizar uma etapa existente de uma obra</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/obras/{idObra}/etapas/{etapaId}</td>
        <td align="center">Remover uma etapa de uma obra por ID</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Responsáveis Técnicos</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/responsaveis-tecnicos</td>
        <td align="center">Listar todos os responsáveis técnicos</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/responsaveis-tecnicos</td>
        <td align="center">Criar um novo responsável técnico</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/responsaveis-tecnicos/{id}</td>
        <td align="center">Buscar um responsável técnico por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/responsaveis-tecnicos/{id}</td>
        <td align="center">Atualizar um responsável técnico existente</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/responsaveis-tecnicos/{id}</td>
        <td align="center">Remover um responsável técnico</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/responsaveis-tecnicos/{id}/obras</td>
        <td align="center">Adicionar vínculos de obras ao responsável técnico</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/responsaveis-tecnicos/{id}/obras</td>
        <td align="center">Listar todos os vínculos de obras de um responsável técnico</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/responsaveis-tecnicos/{id}/obras/{obraId}</td>
        <td align="center">Atualizar vínculo específico entre responsável técnico e obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/responsaveis-tecnicos/{id}/obras/{obraId}</td>
        <td align="center">Buscar vínculo específico entre responsável técnico e obra</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/responsaveis-tecnicos/{id}/obras/{obraId}</td>
        <td align="center">Remover vínculo entre responsável técnico e obra</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Diários de Obra</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/obras/{idObra}/diarios</td>
        <td align="center">Criar novo diário de obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{idObra}/diarios</td>
        <td align="center">Listar diários de obra</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/obras/{idObra}/diarios/{diarioId}</td>
        <td align="center">Obter diário específico</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/obras/{idObra}/diarios/{diarioId}</td>
        <td align="center">Atualizar diário de obra</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/obras/{idObra}/diarios/{diarioId}</td>
        <td align="center">Remover diário de obra</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Materiais</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/materiais</td>
        <td align="center">Criar um novo material</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/materiais</td>
        <td align="center">Listar todos os materiais</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/materiais/{id}</td>
        <td align="center">Obter um material por ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/materiais/{id}</td>
        <td align="center">Atualizar um material existente</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/materiais/{id}</td>
        <td align="center">Remover um material</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Fiscalizações</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes</td>
        <td align="center">Listar todas as fiscalizações</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes/recentes</td>
        <td align="center">Listar as 10 fiscalizações mais recentes</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes/{id}</td>
        <td align="center">Buscar uma fiscalização pelo ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/fiscalizacoes/{id}</td>
        <td align="center">Atualizar por completo uma fiscalização pelo ID</td>
      </tr>
      <tr>
        <td align="center">PATCH</td>
        <td align="center">/api/fiscalizacoes/{id}</td>
        <td align="center">Atualizar o status de uma fiscalização pelo ID</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/fiscalizacoes/{id}</td>
        <td align="center">Excluir uma fiscalização</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes/status/{status}</td>
        <td align="center">Buscar fiscalizações por status</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes/{id}/detalhes</td>
        <td align="center">Buscar uma fiscalização, e suas relações com obras, responsável técnico, e relatórios</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/fiscalizacoes/obras/{id}/fiscalizacoes</td>
        <td align="center">Buscar todas as fiscalizações associadas a uma obra</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/fiscalizacoes/obras/{id}/fiscalizacoes</td>
        <td align="center">Excluir todas as fiscalizações associadas a uma obra</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/fiscalizacoes/obras/fiscalizacao</td>
        <td align="center">Criar uma fiscalização para uma obra</td>
      </tr>
    </tbody>
  </table>
</details>

<details>
  <summary>Relatórios</summary>
  <table>
    <thead>
      <tr>
        <td align="center">Método</td>
        <td align="center">Endpoint</td>
        <td align="center">Descrição</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/relatorios</td>
        <td align="center">Listar todos os relatórios</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/relatorios/{id}</td>
        <td align="center">Buscar um relatório específico pelo ID</td>
      </tr>
      <tr>
        <td align="center">PUT</td>
        <td align="center">/api/relatorios/{id}</td>
        <td align="center">Atualizar um relatório pelo ID</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/relatorios/{id}</td>
        <td align="center">Excluir um relatório pelo ID</td>
      </tr>
      <tr>
        <td align="center">GET</td>
        <td align="center">/api/relatorios/fiscalizacoes/{id}</td>
        <td align="center">Listar os relatórios de uma fiscalização específica</td>
      </tr>
      <tr>
        <td align="center">POST</td>
        <td align="center">/api/relatorios/fiscalizacoes/{id}</td>
        <td align="center">Criar um novo relatório para uma fiscalização</td>
      </tr>
      <tr>
        <td align="center">DELETE</td>
        <td align="center">/api/relatorios/fiscalizacoes/{id}</td>
        <td align="center">Excluir todos os relatórios de uma fiscalização</td>
      </tr>
    </tbody>
  </table>
</details>

# Regras de Negócio

- listar as regras de negócio, e quais endpoints elas afetam

# Banco de Dados

- como usar o dbeaver pra acessar o banco do compose

# Documentações de Apoio

Aqui residem algumas documentações para lhe auxiliar a configurar seu ambiente.

## Instalação do Docker (Linux)

A instalação do Docker pode variar dependendo da distribuição que utiliza, portanto aconselhamos recorrer diretamente à documentação de [Instalação do Docker Engine](https://docs.docker.com/engine/install/). Para fins de demonstração, iremos detalhar a [instalação em sistemas Debian-based](docs.docker.com/engine/install/debian/).

1. Rode o comando abaixo para remover todos os pacotes que podem conflitar na instalação do Docker:
```
$ for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```
2. Configure o repositório do Docker no gerenciador de pacotes `apt`:
```
# Add Docker's official GPG key:
$ sudo apt-get update

$ sudo apt-get install ca-certificates curl

$ sudo install -m 0755 -d /etc/apt/keyrings

$ sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc

$ sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

$ sudo apt-get update
```
3. Rode o comando abaixo para instalar as versões mais recentes dos pacotes necessários:
```
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
4. Valide sua instalação rodando o `hello world` do Docker:
```
$ sudo docker run hello-world
```

## Instalação do Docker (Windows)

1. Encontre um pendrive descartável com pelo menos 5gb de armazenamento.
2. Instale o programa [Balena Etcher](https://etcher.balena.io/) para criar um drive bootável.
3. Clique no link a seguir para baixar a ISO mais recente do ["""Windows"""](https://mint.c3sl.ufpr.br/stable/22.1/linuxmint-22.1-cinnamon-64bit.iso).
4. Transforme o seu pendrive em um drive bootável através do Balena Etcher com a ISO do """Windows""".
5. Desligue seu computador, entre na BIOS, e altere o drive de boot para o pendrive.
6. Salve as alterações, e reinicie o sistema.
7. Ao bootar no """Windows""", instale-o em seu sistema, e volte ao tópico anterior (Instalação do Docker (Linux)) para prosseguir com o tutorial.
