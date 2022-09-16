import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database/database";
import { __createId, __createItem } from "./factory/itemFactory";

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
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    const response = await supertest(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Testa GET /items/:id ", () => {
  it("Deve retornar status 200 e um objeto igual a o item cadastrado", async () => {
    const item = await __createItem();
    const createdItem = await supertest(app).post("/items").send(item);

    const { body: newItem } = createdItem;

    const result = await supertest(app).get(`/items/${newItem.id}`);

    expect(result.status).toBe(200);
    expect(newItem).toEqual(result.body);
  });

  it("Deve retornar status 404 caso não exista um item com esse id", async () => {
    const id = __createId()

    const response = await supertest(app).get(`items/${id}`);

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
