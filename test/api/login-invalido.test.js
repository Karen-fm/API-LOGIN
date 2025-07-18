import request from 'supertest';
import * as chai from 'chai';
const expect = chai.expect;
import app from '../../index.js'; // ajuste o caminho se necessário

describe('Cenários de Falha (Login Inválido)', () => {
  it('deve retornar erro 401 ao logar com senha errada', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'user1@email.com',
        password: 'senha1234',
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property(
          'message',
          'Usuário ou senha inválidos',
        );
        done();
      });
  });

  it('deve retornar erro 401 ao logar com e-mail errado', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'user7@email.com',
        password: 'senha123',
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).to.have.property(
          'message',
          'Usuário ou senha inválidos',
        );
        done();
      });
  });
});
