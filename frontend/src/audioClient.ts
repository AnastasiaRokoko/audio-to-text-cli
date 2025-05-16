export async function sendAudio(
  file: Blob | File,
  filename: string
): Promise<string> {
  const form = new FormData();
  form.append("audio", file, filename);

  const res = await fetch("http://localhost:3000/audio-to-text", {
    method: "POST",
    body: form,
  });

  const data = (await res.json()) as { text?: string; error?: string };
  if (data.error) {
    throw new Error(data.error);
  }
  return data.text || "";
}
