# <p align="center">Projeto Talker Manager</p>

## Contexto

Este projeto consiste em uma `API REST` `Node` com `Express` para cadastro de palestrantes. Sendo possível cadastrar, visualizar, pesquisar, editar e excluir os dados, implementando um CRUD, utilizando um banco em memória e uma das rotas utilizando o `MySQL` para armazenamento.

<details>

<summary><strong>Rode o projeto localmente</strong></summary><br>

> ⚠️ É preciso ter o [Node](https://nodejs.org/en) instalado em sua máquina.
>
> ⚠️ É preciso criar um arquivo `.env` na raiz do projeto, siga o exemplo do arquivo [`env.example`](./env.example).
>

Clone o repositório:

```BASH
git clone git@github.com:mairess/project-talker-manager.git
```

Instale as dependências:

```BASH
npm install
```

Inicie server:

```BASH
env $(cat .env) npm dev
```

</details>

<details>

<summary><strong>Rode o projeto com o docker</strong></summary><br>

> ⚠️ É preciso ter o [Docker](https://www.docker.com/get-started/) instalado em sua máquina.

Clone o repositório:

```BASH
git clone git@github.com:mairess/project-talker-manager.git
```

Suba o container:

```BASH
docker compose up -d
```

Acesse o terminal do container:

```BASH
docker exec -it talker_manager bash
```

Inicie o server, estará disponível na porta `3001`:

```HTML
http://localhost:3001/talker
```

</details>

## Documentação da API

A documentação desta api está disponível através da rota `/api-docs/`

## Competências desenvolvidas

- Habilidade em criar `rotas` de uma API utilizando `Express` e `Node.js`.
- Conhecimento no uso dos verbos HTTP (`PUT`, `POST`, `GET`, `DELETE`, `PATCH`) para manipulação de recursos na API.
- Integração e interação com um banco de dados `MySQL`.
