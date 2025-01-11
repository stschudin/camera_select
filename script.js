
const videoElement = document.getElementById("video");
const cameraSelect = document.getElementById("cameraSelect");
const startCameraButton = document.getElementById("startCamera");

// Funktion, um verfügbare Kameras aufzulisten
async function listCameras() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Kamera aktivieren, um Zugriff zu erlauben
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === "videoinput");

    cameraSelect.innerHTML = ""; // Vorherige Optionen entfernen
    videoDevices.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || `Kamera ${index + 1}`;
      cameraSelect.appendChild(option);
    });

    // Standardkamera anzeigen
    if (videoDevices.length > 0) {
      activateCamera(videoDevices[0].deviceId);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Kameras:", error);
    alert("Kamera konnte nicht erkannt werden. Bitte überprüfen Sie die Berechtigungen.");
  }
}

// Funktion, um eine ausgewählte Kamera zu aktivieren
async function activateCamera(deviceId) {
  try {
    const constraints = deviceId
      ? { video: { deviceId: { exact: deviceId } } }
      : { video: true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoElement.style.display = "block"; // Video sichtbar machen
  } catch (error) {
    console.error("Kamera konnte nicht aktiviert werden:", error);
    alert("Fehler beim Aktivieren der Kamera.");
  }
}

// Ereignislistener für den Kamera-Start-Button
startCameraButton.addEventListener("click", () => {
  const selectedCameraId = cameraSelect.value;
  activateCamera(selectedCameraId);
});

// Kameras initial laden
listCameras();
