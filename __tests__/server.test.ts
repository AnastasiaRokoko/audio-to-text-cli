import { describe, it, expect, beforeAll, afterAll } from "vitest";
import Fastify from "fastify";
import multipart from "@fastify/multipart";
import path from "path";
import fs from "fs";
import { transcribeAudio } from "../src/whisper";
import { pipeline } from "stream/promises";
import fetch from "node-fetch";
import FormData from "form-data";

// Сервер
function buildServer() {
  const server = Fastify();
  server.register(multipart);

  const tempDir = path.resolve("temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  server.post("/audio-to-text", async (req, reply) => {
    const parts = await req.parts();

    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "audio") {
        const tempFilePath = path.join(tempDir, part.filename);
        await pipeline(part.file, fs.createWriteStream(tempFilePath));

        try {
          const text = await transcribeAudio(tempFilePath);
          return { text };
        } catch (err) {
          reply.status(500);
          return {
            error: "Transcription failed",
            details: err instanceof Error ? err.message : String(err),
          };
        } finally {
          fs.unlinkSync(tempFilePath);
        }
      }
    }

    reply.status(400).send({ error: "No audio file found in 'audio' field." });
  });

  return server;
}

describe("POST /audio-to-text", () => {
  let server: ReturnType<typeof buildServer>;
  let address: string;

  //перед тестами запуск сервера и запоминание его адреса
  beforeAll(async () => {
    server = buildServer();
    await server.listen({ port: 0 }); // запуск на случайном порту
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
