
const videoElement = document.getElementById("video");
const cameraSelect = document.getElementById("cameraSelect");
const startCameraButton = document.getElementById("startCamera");
const capturePhotoButton = document.getElementById("capturePhoto");
const discardPhotoButton = document.getElementById("discardPhoto");
const photoCanvas = document.getElementById("photoCanvas");
const ocrResults = document.getElementById("ocrResults");
const matchedText = document.getElementById("matchedText");

// JSON-Fragmente laden
const fragments = ["ZH14", "AC", "LU100"];

// Funktion, um verfügbare Kameras aufzulisten
async function listCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === "videoinput");
    cameraSelect.innerHTML = "";
    videoDevices.forEach((device, idx) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Kamera ${idx + 1}`;
      cameraSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Kameras:", error);
  }
}

// Funktion, um eine ausgewählte Kamera zu aktivieren
async function activateCamera(deviceId) {
  try {
    const constraints = deviceId ? { video: { deviceId: { exact: deviceId } } } : { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.style.display = "block";
    capturePhotoButton.style.display = "inline";
    discardPhotoButton.style.display = "none";
    photoCanvas.style.display = "none";
    ocrResults.style.display = "none";
  } catch (error) {
    console.error("Kamera konnte nicht aktiviert werden:", error);
  }
}

// Funktion, um ein Foto zu machen
function capturePhoto() {
  const context = photoCanvas.getContext("2d");
  photoCanvas.width = videoElement.videoWidth;
  photoCanvas.height = videoElement.videoHeight;
  context.drawImage(videoElement, 0, 0, photoCanvas.width, photoCanvas.height);
  performOCR(photoCanvas);
}

// OCR-Funktion mit Tesseract.js
async function performOCR(canvas) {
  const { createWorker } = Tesseract;
  const worker = createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const { data: { text } } = await worker.recognize(canvas);
  await worker.terminate();
  checkJSONForMatches(text);
}

// JSON-Abgleich durchführen
function checkJSONForMatches(extractedText) {
  const match = fragments.some(fragment => extractedText.includes(fragment));

  if (match) {
    matchedText.textContent = "Der erkannte Text ist in der JSON-Datei enthalten.";
    matchedText.style.color = "green";
  } else {
    matchedText.textContent = "Der erkannte Text ist nicht in der JSON-Datei enthalten.";
    matchedText.style.color = "red";
  }

  ocrResults.style.display = "block";
}

// Ereignislistener einrichten
startCameraButton.addEventListener("click", () => {
  const selectedCameraId = cameraSelect.value;
  activateCamera(selectedCameraId);
});
capturePhotoButton.addEventListener("click", capturePhoto);
discardPhotoButton.addEventListener("click", () => {
  photoCanvas.style.display = "none";
  videoElement.style.display = "block";
});

// Kameras initial laden
listCameras();
