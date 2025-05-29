import { AudioProcessingApiClient } from "@ics/gx-vector-search";

export function setupUploader() {
  const input = document.getElementById("file-input") as HTMLInputElement;
  const button = document.getElementById("upload") as HTMLButtonElement;
  const output = document.getElementById("transcript") as HTMLParagraphElement;
  const icon = document.querySelector(
    ".upload-icon"
  ) as HTMLImageElement | null;

  const client = new AudioProcessingApiClient({
    baseUrl: "http://localhost:3005",
    meta: { instanceName: "frontend-example" },
  });

  button.disabled = true;

  input.addEventListener("change", () => {
    button.disabled = !input.files?.length;
  });

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!input.files?.length) return;

    const file = input.files[0];
    output.textContent = "Загружаем файл…";
    icon?.classList.add("recording");

    try {
      const result = await client.transcribe({ audio: file });
      output.textContent = result.text;
    } catch (err: any) {
      console.error("Upload error:", err);
      output.textContent = `Error: ${err.message}`;
    } finally {
      icon?.classList.remove("recording");
    }
  });
}
