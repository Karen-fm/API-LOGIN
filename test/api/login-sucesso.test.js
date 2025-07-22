import request from "supertest";
import * as chai from "chai";
const expect = chai.expect;
import app from "../../index.js"; // ajuste o caminho se necessário

describe("Login - Sucesso", function () {
  it("deve retornar status 200 ao colocar as credenciais corretas", async function () {
    const res = await request(app)
      .post("/login")
      .send({ username: "user1", password: "senha123" });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Login realizado com sucesso");
  });
});
