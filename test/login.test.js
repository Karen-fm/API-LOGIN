import request from "supertest";
import chai from "chai";
const expect = chai.expect;
import app from "../index.js";

describe("API de Login", function () {
  it("deve realizar login com sucesso", async function () {
    const res = await request(app)
      .post("/login")
      .send({ username: "user1", password: "senha123" });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Login realizado com sucesso");
  });

  it("deve falhar login com senha errada", async function () {
    const res = await request(app)
      .post("/login")
      .send({ username: "user1", password: "errada" });
    expect(res.status).to.equal(401);
  });

  it("deve bloquear usuário após 3 tentativas", async function () {
    await request(app)
      .post("/login")
      .send({ username: "user1", password: "errada" });
    await request(app)
      .post("/login")
      .send({ username: "user1", password: "errada" });
    const res = await request(app)
      .post("/login")
      .send({ username: "user1", password: "errada" });
    expect(res.status).to.equal(423);
    expect(res.body.message).to.equal("Usuário bloqueado");
  });

  it("deve lembrar senha com email válido", async function () {
    const res = await request(app)
      .post("/lembrar-senha")
      .send({ email: "user1@email.com" });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Lembrete de senha enviado para o email");
  });

  it("deve retornar erro para email não cadastrado", async function () {
    const res = await request(app)
      .post("/lembrar-senha")
      .send({ email: "naoexiste@email.com" });
    expect(res.status).to.equal(404);
  });
});
