import { describe, it, expect } from "vitest";
import { transcribeAudio } from "../src/whisper";
import path from "path";

const testCases = [
  {
    file: "test-assets/one_two_three.wav",
    expectedText: "1, 2, 3, 4, 5",
  },
  {
    file: "test-assets/poem1.wav",
    expectedText: "марина цветаева поймёт не тот, кто",
  },
  {
    file: "test-assets/poem2.wav",
    expectedText: "владимир маяковский. послушайте, ведь",
  },
  {
    file: "test-assets/hunter_bear.wav",
    expectedText: "просили голосовое сообщение, я готова",
  }
];

describe("Audio Transcription", () => {
  testCases.forEach(({ file, expectedText }) => {
    it(`correctly transcribes ${file}`, async () => {
      const text = await transcribeAudio(path.resolve(file));
      expect(text.toLowerCase()).toContain(expectedText.toLowerCase());
    });
  });
});
