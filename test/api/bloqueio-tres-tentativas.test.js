import request from "supertest";
import * as chai from "chai";
const expect = chai.expect;
import app from "../../index.js"; // ajuste o caminho se necessário

describe("Login - Bloqueio após 3 tentativas", function () {
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
    expect(res.status).to.equal(403);
    expect(res.body.message).to.equal("Usuário bloqueado");
  });
});
