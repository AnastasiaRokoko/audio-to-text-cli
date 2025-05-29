# Audio-to-Text Playground (with OpenAI Whisper)

A simple **frontend + backend** project written in TypeScript that lets you **record from your microphone** or **upload an audio file** and transcribes it to text using OpenAI’s Whisper model.

---

## ✨ Features

- **Web UI**  
  – Single-page interface built with Vite + TypeScript  
  – “Начать запись” / “Стоп” via MediaRecorder API  
  – “Загрузить файл” via `<input type="file">`  
  – Shared transcript area for both modes
- **Backend API**  
  – Fastify server with `@fastify/multipart` & `@fastify/cors`  
  – `/audio-to-text` endpoint accepts `multipart/form-data`  
  – Uses OpenAI Whisper model via official SDK
- **Networking**  
  – Built-in proxy support (socks-proxy-agent)  
  – CORS enabled for local dev
- **Developer tooling**  
  – TypeScript everywhere  
  – Unit & integration tests with Vitest  
  – Prettier code formatting

---

## Getting Started

You need **two terminals**—one for the backend, one for the frontend.

### Backend+Frontend

### 1. Clone the repo

```bash
git clone https://github.com/AnastasiaRokoko/audio-to-text-cli.git
cd audio-to-text-cli

cd backend
npm install
npm run start


cd ../frontend
npm install
npm run dev
# → Vite dev server on http://localhost:5173

```

### 2.🔧 Tools & Stack

Backend: Node.js, Fastify, @fastify/multipart, @fastify/cors, OpenAI SDK

Frontend: Vite, TypeScript, native DOM API, fetch, MediaRecorder

Shared: Vitest, Prettier

Enjoy building and experimenting with real-time audio transcription! 🎙️✨
