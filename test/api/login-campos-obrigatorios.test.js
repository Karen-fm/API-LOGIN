import request from 'supertest';
import * as chai from 'chai';
const expect = chai.expect;
import app from '../../index.js';

describe('Login - Campos Obrigatórios', () => {
  it('deve retornar erro 401 quando username não é enviado', async () => {
    const res = await request(app)
      .post('/login')
      .send({ password: 'senha123' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Usuário ou senha inválidos');
  });

  it('deve retornar erro 401 quando password não é enviado', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'user1' });
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Usuário ou senha inválidos');
  });

  
  
  it('deve retornar erro 401 quando e-mail não é enviado', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: "user1@email.com"});
    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Usuário ou senha inválidos');
  });

    it('deve retornar erro 401 quando nenhum campo é enviado', async () => {
        const res = await request(app)
          .post('/login')
          .send({});
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Usuário ou senha inválidos');
  });
});
