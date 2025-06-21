Verstanden. Die Anforderung, die gesamte Applikation in einer einzigen HTML-Datei zu bündeln, stellt eine fundamentale architektonische Weichenstellung dar. Sie erzwingt einen Paradigmenwechsel weg von modernen Build-Prozessen und Frameworks hin zu einer puren, aber hochgradig organisierten "Vanilla"-Struktur. Als Systemarchitekt nehme ich diese Herausforderung an und präsentiere eine präzise, umsetzbare Spezifikation für dieses anspruchsvolle Vorhaben.

Die folgende Spezifikation ist nicht nur eine Umformulierung, sondern eine vollständige Neukonzeption der Architektur, die speziell für die Ausführung in einer einzigen Datei optimiert ist.

---

### **Spezifikation: Modulare Produktivitäts-Web-App "Tagesbegleiter" (Single-File-Architektur)**

**Version:** 2.0 (Single-File)
**Datum:** 24. Mai 2024

#### **1. Projektübersicht**

Das Ziel bleibt unverändert: die Entwicklung einer hochgradig personalisierbaren Web-App, die als modulares Dashboard ("Werkzeugkasten") fungiert. Der Fokus liegt weiterhin auf einem minimalistischen, taktilen Design (Neumorphismus), intuitiver Bedienung und der Automatisierung wiederkehrender Aufgaben. Die entscheidende Änderung liegt in der technischen Implementierung, die auf eine einzige HTML-Datei beschränkt ist.

**Zielgruppe:** Wissensarbeiter, die am PC tätig sind und eine zentrale, ästhetisch ansprechende, portable und wartungsarme Oberfläche zur Organisation ihres Arbeitstages suchen.

#### **2. Architektur & Technologie-Stack (Single-File-Prinzip)**

Die gesamte Applikation – Struktur (HTML), Design (CSS) und Logik (JavaScript) – wird in einer einzigen `index.html`-Datei gekapselt. Dies eliminiert jegliche Build-Schritte und externe Dateiabhängigkeiten.

*   **Grundstruktur:** Die App wird mit reinem (Vanilla) JavaScript (ES6+), HTML5 und CSS3 umgesetzt. Es wird **kein JavaScript-Framework** (wie React, Vue oder Svelte) verwendet.
*   **Styling (CSS):** Das gesamte CSS wird in einem einzigen `<style>`-Block im `<head>` der HTML-Datei platziert. Um die Design-Logik (insb. Light/Dark Mode und Akzentfarben) effizient zu verwalten, wird exzessiver Gebrauch von **CSS Custom Properties (Variablen)** gemacht.
    *   Beispiel: `--background-color`, `--shadow-light`, `--shadow-dark`, `--accent-color-start`.
*   **Logik (JavaScript):** Der gesamte JavaScript-Code wird in einem einzigen `<script type="module">`-Block am Ende des `<body>` platziert. Dies ermöglicht die Nutzung von ES6-Modulen (z.B. für Import/Export von Hilfsfunktionen) innerhalb des Skripts, was die Code-Organisation erheblich verbessert.
*   **Komponenten-Templating:** Anstelle von Framework-Komponenten wird das native `<template>`-HTML-Element verwendet. Für jede Kachel-Art (Uhr, Tagesleiste etc.) wird eine wiederverwendbare Vorlage im HTML definiert. JavaScript klont diese Vorlagen bei Bedarf (`template.content.cloneNode(true)`), füllt sie mit Daten und fügt sie in das DOM ein.
*   **Backend & Authentifizierung (BaaS):** Die Anbindung an **Google Firebase** (oder eine äquivalente BaaS-Lösung) bleibt bestehen. Die Firebase SDKs werden nicht als Dateien heruntergeladen, sondern über ihre offiziellen **CDN-Links** direkt im `<script>`-Block vor dem Haupt-App-Skript geladen. Dies erhält die Cloud-Funktionalität, ohne das Single-File-Prinzip zu verletzen.
*   **Datenpersistenz (Lokal):** `localStorage` wird wie ursprünglich geplant für die Zwischenspeicherung des Tageszustands genutzt.

#### **2.1. Konzeptionelle Dateistruktur (innerhalb der `index.html`)**

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tagesbegleiter</title>

    <!-- ==== 1. CSS STYLES ==== -->
    <style>
        /* Globale Stile, CSS-Variablen für Themes, Neumorphismus-Klassen etc. */
        :root { /* Light Mode (default) */ }
        [data-theme="dark"] { /* Dark Mode Overrides */ }
        /* ...alle weiteren CSS-Regeln... */
    </style>
</head>
<body data-theme="light">

    <!-- ==== 2. SICHTBARE HTML-STRUKTUR (CONTAINER) ==== -->
    <main id="dashboard-grid"></main>
    <div id="modal-overlay" class="hidden"></div>
    
    <!-- ==== 3. HTML-VORLAGEN FÜR KACHELN (Templates) ==== -->
    <template id="template-clock">
        <div class="tile tile-1x1 clock">...</div>
    </template>
    <template id="template-timeline">
        <div class="tile tile-3x1 timeline">...</div>
    </template>
    <!-- ...weitere Templates für jede Kachel-Art... -->


    <!-- ==== 4. EXTERNE BIBLIOTHEKEN (CDN) ==== -->
    <!-- Firebase SDKs -->
    <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>
    <!-- (Optional) Drag & Drop Bibliothek, z.B. SortableJS -->
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>


    <!-- ==== 5. APPLIKATIONSLOGIK (JAVASCRIPT) ==== -->
    <script type="module">
        // === Initialisierung & Konfiguration ===
        const firebaseConfig = { /* ... */ };
        firebase.initializeApp(firebaseConfig);
        
        // === Zustand der App (State Management) ===
        const state = { /* ... */ };

        // === Modulare Logik (Klassen oder Objekte für jede Kachel) ===
        class ClockWidget { /* ... */ }
        class TimelineWidget { /* ... */ }
        
        // === Haupt-App-Logik (Initialisierung, Event Listener) ===
        document.addEventListener('DOMContentLoaded', () => {
            // App starten, Layout laden, Kacheln rendern...
        });
        
        // === Hilfsfunktionen ===
        function saveToFirestore() { /* ... */ }
    </script>
</body>
</html>
```

---

#### **3. Kernfunktionen & UI-Komponenten (Angepasste Implementierung)**

##### **3.1. Allgemeines UI/UX & Design**

*   **Design-Sprache (Neumorphismus):** Unverändert. Wird vollständig mit purem CSS und den oben genannten Schatten-Variablen umgesetzt. Der "Pressed"-Effekt wird über die `:active`-Pseudoklasse realisiert.
*   **Layout-System:**
    *   Das Gitter (`#dashboard-grid`) wird ein **CSS Grid** sein.
    *   Drag & Drop wird entweder durch die native HTML Drag & Drop API oder eine leichtgewichtige Bibliothek wie **SortableJS** (via CDN) realisiert. Die Bibliothek ist zu bevorzugen, da sie eine bessere User Experience bietet.
*   **Light/Dark Mode:** Der Wechsel wird durch einen JavaScript-Event-Listener auf dem "Design-Umschalter" realisiert, der das `data-theme`-Attribut auf dem `<body>`-Tag zwischen `'light'` und `'dark'` umschaltet. Das CSS reagiert darauf mit den definierten Variablen.

##### **3.2. Kachel-Verwaltung ("Shop")**

*   **Hinzufügen:** Ein Klick auf "+" öffnet ein Modal (ein einfaches `<div>`, das per JS sichtbar geschaltet wird). Dieses Modal zeigt Abbilder der verfügbaren Kacheln. Ein Klick darauf instanziiert die entsprechende JavaScript-Klasse und klont das zugehörige `<template>`, um die Kachel auf dem Grid zu platzieren.
*   **Entfernen:** Der Rechtsklick-Handler fügt dynamisch ein "X"-Element hinzu. Ein Klick darauf entfernt das DOM-Element der Kachel und zerstört die zugehörige JS-Instanz.

##### **3.3. Kachel: Tagesleiste**

*   **Implementierung:** Die Logik (Zeitberechnung, Pausenaddition) wird in einer dedizierten `TimelineWidget`-Klasse gekapselt. Die Visualisierung (Fortschrittsbalken, Termin-Blöcke) wird durch dynamische Erstellung und Manipulation von `<div>`-Elementen innerhalb der Kachel realisiert. Der Fortschrittsbalken wird durch Ändern der `width`-Eigenschaft eines inneren Elements umgesetzt.
*   **Alarm:** Der Bildschirm-Blink-Effekt wird durch kurzes Hinzufügen und Entfernen einer CSS-Klasse zum `<body>` erreicht, die z.B. einen hellen `box-shadow: inset` oder einen schnellen Helligkeitswechsel anwendet.

##### **3.4. Kachel: Prompt-Bibliothek**

*   **Implementierung:** Die gesamte UI (Kategorie-Auswahl, Prompt-Liste, Editor-Formular) wird in Modals oder Overlays dargestellt, die durch Klonen von `<template>`-Elementen und deren Befüllung mit Daten aus dem JavaScript-State generiert werden. Die Platzhalter-Ersetzung ist eine reine String-Manipulations-Funktion in JavaScript.

##### **3.5. Kachel: Neumorphische Uhr**

*   **Implementierung:** Ein `setInterval` oder `requestAnimationFrame` im JavaScript (innerhalb der `ClockWidget`-Klasse) wird jede Sekunde ausgeführt.
    1.  Es aktualisiert den Textinhalt der Zeitanzeige.
    2.  Es berechnet die aktuelle Farbe basierend auf der Sekunde und den vom Benutzer konfigurierten Start-/Endfarben.
    3.  Es setzt eine CSS-Variable (`--clock-digit-color`), die von der CSS-Regel für die Uhrziffern verwendet wird.

##### **3.6. Kachel: Daten-Analyse**

*   **Implementierung:** Die Logik zur Berechnung der Durchschnittswerte wird in einer `AnalyticsWidget`-Klasse gekapselt. Sie liest die Daten aus dem `dailyLogs`-Array im globalen State (der aus Firestore geladen wird) und schreibt das Ergebnis direkt in die entsprechenden DOM-Elemente der Kachel.

##### **3.7. Kachel: Design-Umschalter**

*   **Implementierung:** Ein simples UI-Element mit einem Event-Listener, der die Theme-Umschaltfunktion aufruft und das Icon (z.B. per CSS-Klassenwechsel) ändert.

#### **4. Datenmodell (Firestore)**

*Das Datenmodell bleibt von der Frontend-Architektur unberührt und ist somit unverändert.*

#### **5. Fehlerbehandlung & Edge Cases**

*   **API-Fehler:** Fehlermeldungen werden durch eine generische `showToast(message, type)`-Funktion in JavaScript angezeigt, die dynamisch ein DOM-Element erstellt, es nach einigen Sekunden wieder entfernt und mit CSS gestylt ist.
*   **Leere Zustände, Validierung, Sicherheitsabfragen:** Werden vollständig in der JavaScript-Logik durch `if/else`-Bedingungen und native `confirm()`-Dialoge (`if (confirm("Sind Sie sicher?")) { ... }`) oder benutzerdefinierte Modal-Dialoge gehandhabt.

#### **6. Testplan (Angepasst an Single-File)**

*   **Unit-Tests:** Werden anspruchsvoller. Die Kernlogik (Zeitberechnung, Platzhalter-Ersetzung, Durchschnittsberechnung) muss in pure, vom DOM entkoppelte Funktionen extrahiert werden. Diese können dann mit einem Test-Runner wie Jest getestet werden, indem der `<script>`-Teil der HTML-Datei in die Testumgebung geladen wird.
*   **Integrationstests:** Entfallen weitgehend zugunsten von E2E-Tests.
*   **End-to-End (E2E) Tests:** Werden zum **kritischsten Teil der Qualitätssicherung**. Ein Werkzeug wie **Cypress** oder **Playwright** ist unerlässlich. Die Tests laden die einzelne `index.html`-Datei in einen headless Browser und simulieren komplette Benutzerinteraktionen (Klicken, Ziehen, Tippen), um die korrekte Funktion der DOM-Manipulationen und der Logik zu verifizieren. Die bestehenden Szenarien sind direkt anwendbar.
*   **UI/UX-Tests:** Unverändert. Manuelle und automatisierte Überprüfung der responsiven Darstellung und der visuellen Effekte.

---

Diese Spezifikation stellt einen robusten und detaillierten Plan dar, um die "Tagesbegleiter"-App als autarke, wartungsfreundliche und hochgradig portable Single-File-Anwendung zu realisieren, ohne dabei die Kernfunktionalität oder die anspruchsvolle User Experience zu kompromittieren.
