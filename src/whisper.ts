import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import { OPENAI_API_KEY, PROXY_URL } from "./config";
import { SocksProxyAgent } from "socks-proxy-agent";

// Создание агента, если прокси указан
const agent = PROXY_URL ? new SocksProxyAgent(PROXY_URL) : undefined;

// Создание клиента OpenAI с агентом (если есть)
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  httpAgent: agent,
});

export async function transcribeAudio(filePath: string): Promise<string> {
  const absolutePath = path.resolve(filePath);
  const fileStream = fs.createReadStream(absolutePath);

  const response = await openai.audio.transcriptions.create({
    file: fileStream,
    model: "whisper-1",
  });

  return response.text;
}
