import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "fs";
import { createServer } from "../src/server";
import fetch from "node-fetch";
import FormData from "form-data";

describe("POST /audio-to-text", () => {
  //обращение к созданному серверу
  let server: ReturnType<typeof createServer>;
  let address: string;

  //перед тестами запуск сервера и запоминание его адреса
  beforeAll(async () => {
    server = createServer();
    await server.listen({ port: 0 }); // запуск на свободном порту
    address = `http://localhost:${(server.server.address() as any).port}`;
  });
  //остановка сервера после тестов
  afterAll(async () => {
    await server.close();
  });
  //тест
  it("should transcribe audio file and return text", async () => {
    //создание FormData, помещение туда аудиофайла
    const form = new FormData();
    form.append("audio", fs.createReadStream("test-assets/one_two_three.wav"));
    //Отправление POST-запроса на локальный сервер, передача файла
    const res = await fetch(`${address}/audio-to-text`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });
    //чтение ответа, парсинг JSON
    const rawBody = await res.text();
    const body = JSON.parse(rawBody);
    console.log("Response status:", res.status);
    console.log("Response body:", body);

    expect(res.status).toBe(200);
    expect(body.text.toLowerCase()).toContain("1");
  });
});
