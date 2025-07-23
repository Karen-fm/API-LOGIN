import request from "supertest";
import * as chai from "chai";
const expect = chai.expect;
import app from "../../index.js";

describe("Lembrar Senha", () => {
  it("deve retornar 404 quando o e-mail não existe", async () => {
    const res = await request(app)
      .post("/lembrar-senha")
      .send({ email: "emailinvalido@email.com" });
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal("Email não encontrado");
  });
});
