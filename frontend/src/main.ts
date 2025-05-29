import "./style.css";
import { setupRecorder } from "./record";
import { setupUploader } from "./upload";
// @ts-ignore
import micIcon from "./assets/micro.svg";
// @ts-ignore
import uploadIcon from "./assets/upload.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div >
    
    <div class="card">
    <div class="controls">

    <!-- Первая группа: микрофон + запись -->
      <div class="control-item">
    <a>
      <img src="${micIcon}" alt="Record" class="mic-icon" />
    </a>
      <button id="record">Начать запись </button>
      </div>
      
    <!-- Вторая группа: загрузка + отправка -->
      <div class="control-item">
    <a>
      <img src="${uploadIcon}" alt="Record" class="upload-icon" />
    </a>
      <button id="upload" disabled>Отправить файл</button>
      <input type="file" id="file-input" accept="audio/*" />
      
    </div>
    </div>

    <div class="result">
    <p id="transcript"></p>
    </div>


    <p class="read-the-docs">
      Click on the button to start recording or choose your own file
    </p>

  </div>
`;

setupRecorder();
setupUploader();
