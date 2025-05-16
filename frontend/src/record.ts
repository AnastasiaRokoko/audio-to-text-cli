import { sendAudio } from "./audioClient";

export function setupRecorder() {
  const btn = document.getElementById("record") as HTMLButtonElement;
  const output = document.getElementById("transcript") as HTMLElement;
  const icon = document.querySelector(".mic-icon") as HTMLImageElement | null;

  let recorder: MediaRecorder | null = null;
  let chunks: Blob[] = [];
  let stream: MediaStream | null = null;

  async function handleStop() {
    const blob = new Blob(chunks, { type: "audio/webm" });
    try {
      const text = await sendAudio(blob, "recording.webm");
      output.textContent = text;
    } catch (err: any) {
      output.textContent = `Error: ${err.message}`;
    }
    // сброс состояния
    chunks = [];
    recorder = null;
    btn.textContent = "Начать запись";
  }

  btn.onclick = async () => {
    if (!recorder || recorder.state === "inactive") {
      if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      recorder = new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = handleStop;
      recorder.start();
      icon?.classList.add("recording");
      btn.textContent = "Стоп";
    } else if (recorder.state === "recording") {
      recorder.stop();
      icon?.classList.remove("recording");
    }
  };
}
