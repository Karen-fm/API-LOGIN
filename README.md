# API de Login para Ecommerce

Esta é uma API REST de estudo para login de usuários em um ecommerce, com funcionalidades de bloqueio automático após 3 tentativas inválidas e lembrar senha. Não utiliza banco de dados, apenas armazenamento em memória.

## Funcionalidades

- Login de usuário
- Bloqueio automático após 3 tentativas inválidas (no endpoint /login)
- Lembrar senha por email
- Documentação Swagger

## Tecnologias

- Node.js
- Express
- Mocha, Chai, Supertest (testes)
- Swagger (documentação)

## Instalação

Após clonar o repositório, instale as dependências do projeto rodando o comando abaixo na raiz do projeto:

```bash
npm install
```

Isso irá criar a pasta `node_modules` localmente com todas as bibliotecas necessárias, conforme especificado no `package.json`.

> **Atenção:**  
> A pasta `node_modules` não está no repositório, pois está listada no `.gitignore`.  
> Por isso, sempre rode `npm install` após clonar o projeto.

## Como rodar

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

## Como rodar os testes

```bash
npx mocha test/login.test.js
```

## Observações

- Usuário de exemplo: `user1` / senha: `senha123` / email: `user1@email.com`
- Todos os dados são armazenados em memória e reiniciam ao reiniciar o servidor.

## Funcionamento do bloqueio automático

Ao tentar fazer login três vezes com senha errada no endpoint `/login`, o usuário será automaticamente bloqueado. Após o bloqueio, qualquer tentativa de login retornará status 403 (Usuário bloqueado).

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
