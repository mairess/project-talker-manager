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

### Autenticação

#### Retorna um token

```HTML
POST /login
```

O corpo da requisição:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

### Palestrantes

#### Retorna palestrantes por nome pesquisado

```HTML
/talker/search?q=${searchTerm}
```

#### Retorna palestrantes por rate pesquisada

```HTML
/talker/search/?rate=${rateNumber}
```

#### Retorna palestrantes por data de visualização

```HTML
/talker/search/?date=${watchedDate}
```

- Date format: `22/10/2019`

#### Retorna todos os palestrantes (memória)

```HTML
GET /talker
```

#### Retorna todos os palestrantes (banco de dados `mysql`)

```HTML
GET /talker/db
```

#### Retorna um palestrante

```HTML
GET /talker/${id}
```

### Rotas `protegidas`

#### Atualiza um palestrante

```HTML
POST /talker/${id}
```

ou

```HTML
PUT /talker/${id}
```

O corpo da requisição:

```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

#### Deleta um palestrante

```HTML
DELETE /talker/${id}
```

#### Atualiza avaliação de um palestrante

```HTML
PATCH /talker/rate/${id}
```

O corpo da requisição:

```json
{
  "rate": 5
}
```

## Competências desenvolvidas

- Habilidade em criar `rotas` de uma API utilizando `Express` e `Node.js`.
- Conhecimento no uso dos verbos HTTP (`PUT`, `POST`, `GET`, `DELETE`, `PATCH`) para manipulação de recursos na API.
- Integração e interação com um banco de dados `MySQL`.
