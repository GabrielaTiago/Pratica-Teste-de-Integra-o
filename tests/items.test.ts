import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database/database";
import { __createItem } from "./factory/itemFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items`;
});

describe("Testa POST /items ", () => {
  it("Deve retornar 201, se cadastrado um item no formato correto", async () => {
    const item = await __createItem();
    const response = await supertest(app).post("/items").send(item);

    expect(response.status).toBe(201);
  });

  it("Deve retornar 409, ao tentar cadastrar um item que exista", async () => {
    const item = await __createItem();

    await supertest(app).post("/items").send(item);
    const response = await supertest(app).post("/items").send(item);

    expect(response.status).toBe(409);
  });
});

describe("Testa GET /items ", () => {
  it.todo("Deve retornar status 200 e o body no formato de Array");
});

describe("Testa GET /items/:id ", () => {
  it.todo("Deve retornar status 200 e um objeto igual a o item cadastrado");
  it.todo("Deve retornar status 404 caso não exista um item com esse id");
});

afterAll(async () => {
  await prisma.$disconnect();
});
