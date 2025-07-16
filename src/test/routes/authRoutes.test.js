import request from "supertest";
import { afterEach, beforeEach, describe } from "@jest/globals";
import app from "../../app.js";

let servidor;

beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe("Testando a rota login (POST)", () => {
  it("O login deve possuir um email e senha para se autenticar", async () => {
    const loginMock = {
      email: "thomaz@teste.com.br",
      // senha: '123456',
    };
    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuario é obrigatória."');
  });

  it("O login deve validar se o usuario esta cadastrado", async () => {
    const loginMock = {
      email: "thomaz@test.com.br",
      senha: "123456",
    };
    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"Usuario não cadastrado."')
  });

    it("O login deve validar email e senha incorreto", async () => {
    const loginMock = {
      email: "thomaz@teste.com.br",
      senha: "123455",
    };
    await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(500)
      .expect('"Usuario ou senha invalido."')
  });

      it("O login deve validar se esta sendo retornado um accessToken", async () => {
    const loginMock = {
      email: "thomaz@teste.com.br",
      senha: "123456",
    };
    const reply = await request(servidor)
      .post("/login")
      .send(loginMock)
      .expect(201);
    expect(reply.body.message).toBe('Usuario conectado');
    expect(reply.body).toHaveProperty('accessToken');
  });
});
