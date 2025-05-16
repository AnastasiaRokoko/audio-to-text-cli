import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { transcribeAudio } from "./whisper";

yargs(hideBin(process.argv))
  .command(
    "audio-to-text <file>",// имя команды и обязательный параметр <file>
    "Transcribe audio to text",// описание (выводится в --help)
    (yargs) => {
      return yargs.positional("file", {
        type: "string",
        describe: "Path to the audio file",
      });
    },
    async (argv) => {
      const filePath = argv.file as string;// приведение к типу string
      try {
        const result = await transcribeAudio(filePath);// вызов ф-ии
        console.log("Результат распознавания:\n", result);
      } catch (err) {
        console.error("Ошибка при распознавании:", err);
      }
    }
  )
  .demandCommand()
  .help()
  .argv;
