# <p align="center">Projeto Talker Manager</p>

## Contexto

Este projeto consiste em uma `API REST` `Node` com `Express` para cadastro de palestrantes. Sendo possível cadastrar, visualizar, pesquisar, editar e excluir os dados, implementando um CRUD, utilizando um banco em memória e uma das rotas utilizando o `MySQL` para armazenamento.

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.
>
> ⚠️ É preciso criar um arquivo `.env` na raiz do projeto, siga o exemplo do arquivo [`env.example`](./env.example).
>

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-talker-manager.git
```

2. Instale as dependências:

```BASH
npm install
```

3. Inicie server:

```BASH
env $(cat .env) npm run dev
```

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

1. Clone o repositório:

```BASH
git clone git@github.com:mairess/project-talker-manager.git
```

2. Suba os containers:

```BASH
docker compose up -d
```

3. Acesse o terminal do container:

```BASH
docker exec -it talker_manager bash
```

4. Inicie o server, estará disponível na porta `3001`:

```HTML
npm run dev
```

</details>

## Documentação da API

A documentação desta api está disponível em `/api-docs`

## Tecnologias utilizadas

- Javascript
- Node
- Express
- MySQL
- Docker
- Swagger-ui
