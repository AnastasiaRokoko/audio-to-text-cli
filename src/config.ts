import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const PROXY_URL = process.env.PROXY_URL;