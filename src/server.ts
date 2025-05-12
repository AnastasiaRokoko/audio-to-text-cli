import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { transcribeAudio } from "./whisper";

//создание сервера и регистрация multipart/form-data
const server = Fastify();
server.register(multipart);

// создание и проверка наличия папки temp
const tempDir = path.resolve("temp");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

// Создание эндпоинта POST /audio-to-text
server.post("/audio-to-text", async (req, reply) => {
  //Получение всех частей запроса, загруженные через multipart
  const parts = await req.parts();
  //поиск файл с полем audio и создание временного пути
  for await (const part of parts) {
    if (part.type === "file" && part.fieldname === "audio") {
      const tempFilePath = path.join(tempDir, part.filename);

      // Сохранение файла во временной папке
      await pipeline(part.file, fs.createWriteStream(tempFilePath));
      //вызов ф-ии расшифровки, в случае успеха возврат текста
      try {
        const text = await transcribeAudio(tempFilePath);
        return { text };
      } catch (err) {
        reply.status(500);
        return { error: "Transcription failed", details: err };
      } finally {
        fs.unlinkSync(tempFilePath); // Удаление файла после использования
      }
    }
  }
  //в случае, если файл не найден
  reply.status(400).send({ error: "No audio file found in 'audio' field." });
});

// Запускаем сервер
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server ready at ${address}`);
});
