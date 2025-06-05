# Gerenciamento de Obras Públicas

Esta API foi criada para gerenciar diversos elementos que compôem uma obra pública. 

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

Para rodar o projeto, precisamos garantir que a ferramenta Docker esteja instalada corretamente em seu ambiente, pois é necessário que o `docker-compose.yml` possa ser executado sem impedimentos.

É possível validar a existência do Docker em seu ambiente através do comando:
```
victor@progweb:~$ docker --version
```

- Se o output retornar `Docker version [versão.do.docker], build [hash-da-build]`, o docker está configurado **corretamente** em seu ambiente.
- Se o output retornar `docker: command not found`, o docker **não está instalado** em seu sistema.

Por favor, confira as [documentações de apoio](#documentações-de-apoio) antes de prosseguir para garantir o funcionamento da aplicação.

# Configuração do Projeto

Para configurarmos o projeto, siga os passos a seguir:

1. Clone o repositório para sua maquina local
```
victor@progweb:~$ git clone https://github.com/levyath/Api_Gerenciamento_de_obras.git
```
2. Crie o arquivo .env na raiz do projeto (/Api_Gerenciamento_de_obras/.env) e popule ele com os valores correspondentes.
```
victor@progweb:~$ cd Api_Gerenciamento_de_obras
victor@progweb:~$ nano .env

//dentro do nano
NODE_ENV=development
DB_HOST=[nome-host-banco]
DB_PORT=5432
DB_EXT_PORT=15432
DB_DATABASE=[nome-database]
DB_USER=[nome-user]
DB_PASSWORD=[senha-user]

//salvar e fechar o arquivo
Ctrl+S + Ctrl+X
```
3. Abra um terminal no diretório raiz do projeto, e rode o docker-compose.yml com o comando abaixo:
```
victor@progweb:~$ docker compose up -d
[+] Running 4/4
 ✔ Network api_gerenciamento_de_obras_default Created 0.1s 
 ✔ Volume "api_gerenciamento_de_obras_pgdata" Created 0.0s 
 ✔ Container api_gerenciamento_de_obras-db-1 Started 6.7s 
 ✔ Container api_gerenciamento_de_obras-api-1 Started 6.8s
```

# Autenticação

- documentar como fazer a autenticação com a API https://github.com/CainaZumaa/controle-users/tree/dev

# Documentação da API

- textinho dizendo q tamo usando o swagger
- como acessar ele

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
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```
2. Configure o repositório do Docker no gerenciador de pacotes `apt`:
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
3. Rode o comando abaixo para instalar as versões mais recentes dos pacotes necessários:
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
4. Valide sua instalação rodando o `hello world` do Docker:
```
sudo docker run hello-world
```

## Instalação do Docker (Windows)

1. Encontre um pendrive descartável com pelo menos 5gb de armazenamento.
2. Instale o programa [Balena Etcher](https://etcher.balena.io/) para criar um drive bootável.
3. Clique no link a seguir para baixar a ISO mais recente do ["""Windows"""](https://mint.c3sl.ufpr.br/stable/22.1/linuxmint-22.1-cinnamon-64bit.iso).
4. Transforme o seu pendrive em um drive bootável através do Balena Etcher com a ISO do """Windows""".
5. Desligue seu computador, entre na BIOS, e altere o drive de boot para o pendrive.
6. Salve as alterações, e reinicie o sistema.
7. Ao bootar no """Windows""", instale-o em seu sistema, e volte ao tópico anterior (Instalação do Docker (Linux)) para prosseguir com o tutorial.