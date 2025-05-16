import { sendAudio } from "./audioClient";

export function setupUploader() {
  const input = document.getElementById("file-input") as HTMLInputElement;
  const button = document.getElementById("upload") as HTMLButtonElement;
  const output = document.getElementById("transcript") as HTMLParagraphElement;
  const icon = document.querySelector(
    ".upload-icon"
  ) as HTMLImageElement | null;

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
      const text = await sendAudio(file, file.name);
      output.textContent = text;
    } catch (err: any) {
      output.textContent = `Error: ${err.message}`;
    } finally {
      icon?.classList.remove("recording");
    }
  });
}
