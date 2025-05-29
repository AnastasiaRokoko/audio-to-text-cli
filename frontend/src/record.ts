import { AudioProcessingApiClient, AudioRecorder } from "@ics/gx-vector-search";

export function setupRecorder() {
  const btn = document.getElementById("record") as HTMLButtonElement;
  const output = document.getElementById("transcript") as HTMLElement;
  const icon = document.querySelector(".mic-icon") as HTMLImageElement | null;

  const recorder = new AudioRecorder();
  const client = new AudioProcessingApiClient({
    baseUrl: "http://localhost:3005",
    meta: { instanceName: "frontend-example" },
  });

  async function handleStop(audioBlob: Blob) {
    try {
      const result = await client.transcribe({ audio: audioBlob });
      output.textContent = result.text;
    } catch (err: any) {
      console.error("Transcription error:", err);
      output.textContent = `Error: ${err.message}`;
    }
    btn.textContent = "Начать запись";
  }

  btn.onclick = async () => {
    if (!recorder.isRecording()) {
      try {
        await recorder.start();
        icon?.classList.add("recording");
        btn.textContent = "Стоп";
      } catch (err: any) {
        output.textContent = `Error: ${err.message}`;
      }
    } else {
      try {
        const audioBlob = await recorder.stop();
        icon?.classList.remove("recording");
        await handleStop(audioBlob);
      } catch (err: any) {
        output.textContent = `Error: ${err.message}`;
        icon?.classList.remove("recording");
        btn.textContent = "Начать запись";
      }
    }
  };
}
