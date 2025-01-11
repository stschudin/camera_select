
# Kamera-Auswahl und Texterkennung (OCR)

Dieses Projekt bietet eine mobile-optimierte Webseite, die folgende Funktionen umfasst:

- **Kameraauswahl:** Auswahl und Aktivierung der verfügbaren Kameras.
- **Fotoaufnahme:** Erstellung eines Fotos mit der ausgewählten Kamera.
- **Texterkennung:** Analyse des aufgenommenen Fotos zur Erkennung von Text mit Tesseract.js.
- **JSON-Abgleich:** Abgleich der erkannten Texte mit einer JSON-Datei zur Identifikation von Übereinstimmungen.

## Voraussetzungen

- **Moderne Browser:** Unterstützt werden aktuelle Versionen von Chrome, Firefox, Edge und Safari.
- **HTTPS-Verbindung:** Für den Zugriff auf die Kamera wird eine sichere Verbindung benötigt.
- **Tesseract.js:** Die Texterkennung erfolgt über die Tesseract.js-Bibliothek.

## Verzeichnisstruktur

```
├── index.html       # Hauptdatei für die Benutzeroberfläche
├── style.css        # CSS für das Design
├── script.js        # JavaScript für Interaktionen und Texterkennung
├── data.json        # JSON-Datei mit Textfragmenten für den Abgleich
├── README.md        # Dokumentation des Projekts
```

## Nutzung

1. **Projekt klonen:**
   ```bash
   git clone https://github.com/<Ihr-Github-Benutzername>/camera-ocr.git
   cd camera-ocr
   ```

2. **Webseite starten:**
   Öffnen Sie die `index.html` in einem unterstützten Browser.

3. **Schritte zur Nutzung:**
   - Kamerazugriff erlauben.
   - Kamera aus der Dropdown-Liste auswählen und aktivieren.
   - Foto aufnehmen und analysieren lassen.
   - Übereinstimmungen mit der JSON-Datei werden angezeigt.

## Wichtige Funktionen

- **Kameraauswahl und Aktivierung:**
  ```javascript
  async function listCameras() { /* Kameras anzeigen */ }
  async function activateCamera(deviceId) { /* Kamera aktivieren */ }
  ```

- **Fotoaufnahme:**
  ```javascript
  async function capturePhoto() { /* Foto machen und Canvas anzeigen */ }
  ```

- **Texterkennung:**
  ```javascript
  async function performOCR() { /* Tesseract.js verwenden */ }
  ```

- **JSON-Abgleich:**
  ```javascript
  async function checkJSONForMatches(extractedText) { /* JSON-Daten prüfen */ }
  ```

## Verbesserungen und Benutzerfreundlichkeit

- **Ladeindikatoren:** Anzeigen während Kamera- und OCR-Prozessen.
- **Fehlerbehandlung:** Klare Rückmeldungen bei Problemen.
- **Interaktive Elemente:** Buttons mit visuellen Rückmeldungen.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der `LICENSE`-Datei.
