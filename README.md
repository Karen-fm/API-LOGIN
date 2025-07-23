# API REST de Login

Esta é uma API REST de estudo para autenticação de usuários, incluindo login, bloqueio automático após 3 tentativas inválidas e lembrete de senha por e-mail. Não utiliza banco de dados, apenas armazenamento em memória.

## Funcionalidades

- Login de usuário
- Bloqueio automático após 3 tentativas inválidas (no endpoint /login)
- Lembrar senha por email
- Documentação Swagger

## Tecnologias

- Node.js
- Express
- body-parser
- Mocha, Chai, Supertest (testes)
- Swagger (documentação interativa)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: versão 18.x ou superior; o npm já vem incluso)

## Instalação

Após clonar o repositório, instale as dependências do projeto rodando o comando abaixo na raiz do projeto:

```bash
npm install
```

Isso irá criar a pasta `node_modules` localmente com todas as bibliotecas necessárias, conforme especificado no `package.json`.

> **Atenção:**  
> A pasta `node_modules` não está no repositório, pois está listada no `.gitignore`.  
> Por isso, sempre rode `npm install` após clonar o projeto.

## Como rodar a API

1. Instale as dependências:

```bash
npm install
```

2. Inicie a API:

```bash
node index.js
```

3. Acesse a documentação Swagger:
   [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   > Por padrão, a API roda na porta **3000**. Se desejar alterar a porta, modifique o arquivo `index.js`.

## Como rodar os testes automatizados

**Para rodar todos os testes:**

```bash
npx mocha test/api/*.test.js
```

**Para rodar um teste específico:**

```bash
npx mocha test/api/nome-do-arquivo.test.js
```

> Exemplo:
>
> ```bash
> npx mocha test/api/login-sucesso.test.js
> ```
>
> Os testes automatizados estão localizados na pasta `test/api/`.

## Autores

**Adriana** - Testes de login com sucesso
**Bruno Reis** - Testes de lembrar senha
**Diego Santos** - Testes de validação de campos obrigatórios
**Karen Machado** - Testes de bloqueio automático
**Viviane Prestes** - Testes de login inválido

## Testes e Responsáveis

| Teste                               | Responsável     | Cobertura                                             |
| ----------------------------------- | --------------- | ----------------------------------------------------- |
| `login-sucesso.test.js`             | Adriana         | Testa login com credenciais válidas                   |
| `lembrar-senha.test.js`             | Bruno           | Testa funcionalidade de lembrar senha por email       |
| `login-campos-obrigatorios.test.js` | Diego           | Testa validação de campos obrigatórios                |
| `bloqueio-tres-tentativas.test.js`  | Karen           | Testa bloqueio automático após 3 tentativas inválidas |
| `login-invalido.test.js`            | Viviane Prestes | Testa cenários de falha no login                      |

## Observações

- Usuário de exemplo: `user1` / senha: `senha123` / email: `user1@email.com`
- Todos os dados são armazenados em memória e reiniciam ao reiniciar o servidor.

## Funcionamento do bloqueio automático

Ao tentar fazer login três vezes com senha errada no endpoint `/login`, o usuário será automaticamente bloqueado. Após o bloqueio, qualquer tentativa de login retornará status 403 (Usuário bloqueado). O desbloqueio do usuário só ocorre ao reiniciar o servidor, pois todos os dados são armazenados em memória.

## Exemplos de uso

### Login com sucesso

**Requisição:**

```http
POST /login
Content-Type: application/json

{
  "username": "user1",
  "password": "senha123"
}
```

**Resposta:**

```json
{
  "message": "Login realizado com sucesso"
}
```

### Login inválido

**Requisição:**

```http
POST /login
Content-Type: application/json

{
  "username": "user1",
  "password": "errada"
}
```

**Resposta:**

```json
{
  "message": "Usuário ou senha inválidos"
}
```

### Usuário bloqueado após 3 tentativas

Após três tentativas de login inválidas:
**Requisição:**

```http
POST /login
Content-Type: application/json

{
  "username": "user1",
  "password": "errada"
}
```

**Resposta:**

```json
{
  "message": "Usuário bloqueado"
}
```

### Lembrar senha

**Requisição:**

```http
POST /lembrar-senha
Content-Type: application/json

{
  "email": "user1@email.com"
}
```

**Resposta:**

```json
{
  "message": "Lembrete de senha enviado para o email"
}
```

> Observação: O endpoint `/lembrar-senha` apenas simula o envio do lembrete de senha. Não há envio real de e-mail.

## Licença

Este projeto está sob a licença MIT.
