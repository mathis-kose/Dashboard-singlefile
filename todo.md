Verstanden. Eine gründliche Roadmap ist das Rückgrat eines jeden erfolgreichen Projekts. Sie dient nicht nur als Checkliste, sondern auch als Kommunikationswerkzeug und als Leitfaden, der sicherstellt, dass wir uns nicht im Detail verlieren.

Hier ist die `todo.md`-Datei, die das Projekt von der Konzeption bis zur Fertigstellung in granulare, nachvollziehbare Schritte unterteilt.

---

```markdown
# Roadmap: Tagesbegleiter (Single-File-App)

Dieses Dokument dient als detaillierter, schrittweiser Plan für die Entwicklung der "Tagesbegleiter"-App. Es folgt einem iterativen Ansatz, bei dem jede Phase auf der vorherigen aufbaut und ein testbares, funktionierendes Inkrement liefert.

**Legende:**
- `[ ]` To Do: Die Aufgabe wurde noch nicht begonnen.
- `[x]` Done: Die Aufgabe ist abgeschlossen und verifiziert.
- `[-]` Skipped/Obsolete: Die Aufgabe ist nicht mehr relevant.

---

### **Phase 0: Projekt-Setup & Infrastruktur**

*Ziel: Ein stabiles Fundament für die Entwicklung schaffen.*

- [ ] **Versionskontrolle**
    - [x] Git-Repository initialisieren.
    - [x] `README.md` mit Projektbeschreibung, Zielen und Setup-Anweisungen erstellen.
    - [x] Diese `todo.md`-Datei zum Projekt hinzufügen und pflegen.
    - [x] `.gitignore`-Datei erstellen (insb. für lokale Konfigurationen oder Test-Artefakte).
- [ ] **Test-Infrastruktur**
    - [x] Entscheidung für ein E2E-Test-Framework (Cypress oder Playwright).
    - [x] Grundlegendes Setup für das gewählte Framework installieren und konfigurieren.
    - [x] Ersten "Smoke Test" schreiben, der prüft, ob die `index.html` ohne Fehler lädt.

---

### **Phase 1: Das Fundament (Grundstruktur & Theming)**

*Ziel: Eine leere, aber funktionierende Seite mit umschaltbarem Light/Dark-Theme.*

- [ ] **HTML-Grundgerüst**
    - [x] `index.html`-Datei mit der korrekten Single-File-Struktur erstellen (Head, Body, Style, Script-Tags).
    - [x] `main#dashboard-grid`-Container im Body platzieren.
- [ ] **CSS-Theming-System**
    - [x] CSS-Variablen für das Light-Theme im `:root`-Selektor definieren (Farben, Schatten).
    - [x] CSS-Variablen für das Dark-Theme im `[data-theme="dark"]`-Selektor definieren.
    - [x] Globale `body`-Stile anwenden, die diese Variablen nutzen (Hintergrund, Textfarbe).
    - [x] Sanfte Übergänge für Farbwechsel hinzufügen (`transition`).
- [ ] **Interaktiver Theme-Umschalter**
    - [x] `button#theme-toggle` im HTML hinzufügen.
    - [x] JavaScript-Logik im `DOMContentLoaded`-Listener implementieren, die das `data-theme`-Attribut auf dem `<body>` umschaltet.
- [ ] **Testing**
    - [ ] E2E-Test schreiben: Klickt auf den Theme-Umschalter und verifiziert, dass sich die `background-color` des `body` korrekt ändert.

---

### **Phase 2: Visuelles Grundgerüst (Layout & Neumorphismus)**

*Ziel: Das charakteristische Design und Layout der App implementieren.*

- [ ] **Layout-System**
    - [ ] `main#dashboard-grid` als responsives CSS Grid stylen (`grid-template-columns`, `gap`, etc.).
- [x] **Layout-System**
    - [x] `main#dashboard-grid` als responsives CSS Grid stylen (`grid-template-columns`, `gap`, etc.).
- [x] **Neumorphisches Kachel-Design**
    - [x] Eine generische `.tile`-Klasse erstellen, die den Neumorphismus-Effekt mittels `box-shadow` und den CSS-Variablen umsetzt.
    - [x] Temporäre Test-Kachel in das Grid einfügen, um das Styling zu verifizieren.
- [x] **Interaktives Kachel-Feedback**
    - [x] Einen `:active`-State für die `.tile`-Klasse definieren, der den "Gedrückt"-Effekt (inset shadow) erzeugt.
- [x] **Testing**
    - [x] E2E-Test erweitern: Verifiziert, dass die Test-Kachel die korrekten Schatten für das jeweilige Theme hat.
    - [x] E2E-Test schreiben: Simuliert ein Klicken/Halten auf der Kachel und prüft, ob sich der `box-shadow` auf den "inset"-Wert ändert.
    - [x] E2E-Test für responsives Grid-Layout hinzugefügt

---

### **Phase 3: Die erste Kachel (Neumorphische Uhr)**

*Ziel: Die erste dynamische, funktionale Kachel zum Dashboard hinzufügen.*

- [x] **Struktur & Styling**
    - [x] Temporäre Test-Kachel aus dem HTML entfernen.
    - [x] `<template id="template-clock">` für die Uhr-Kachel erstellen.
    - [x] Spezifisches CSS für die Uhr-Kachel und die Zeitanzeige (`.clock-time`) hinzufügen.
- [x] **Logik-Kapselung**
    - [x] Die `ClockWidget`-Klasse in JavaScript definieren.
        - [x] `constructor` zum Binden an ein DOM-Element.
        - [x] `updateTime()`-Methode zur Formatierung und Anzeige der aktuellen Zeit.
        - [x] `start()`-Methode, die `setInterval` zur sekündlichen Aktualisierung nutzt.
- [x] **Integration**
    - [x] Im Hauptskript die Uhr-Vorlage klonen, ins DOM einfügen und eine `ClockWidget`-Instanz dafür erstellen.
    - [x] Die `start()`-Methode der Instanz aufrufen.
- [x] **Funktionserweiterung (aus Spezifikation)**
    - [x] Uhr-Logik erweitern, um die Ziffernfarbe basierend auf der Sekunde zu ändern (via CSS-Variable `--clock-digit-color`).
- [ ] **Testing**
    - [ ] E2E-Test schreiben: Verifiziert, dass die Uhr-Kachel angezeigt wird und sich die angezeigte Zeit im Sekundentakt ändert.

---

### **Phase 4: Dynamische Kachel-Verwaltung**

*Ziel: Dem Benutzer ermöglichen, Kacheln dynamisch hinzuzufügen und zu entfernen.*

- [x] **Kachel hinzufügen ("Shop")**
    - [x] HTML/CSS für ein Modal erstellen, das verfügbare Kacheln anzeigt (idealerweise auch via `<template>`).
    - [x] JavaScript-Logik zum Öffnen/Schließen des Modals implementieren.
    - [x] Logik implementieren, die bei Klick auf eine Kachel-Art im Modal:
        - [x] Das entsprechende `<template>` klont.
        - [x] Das geklonte Element zum Grid hinzufügt.
        - [x] Die zugehörige Widget-Klasse instanziiert.
- [x] **Kachel entfernen**
    - [x] Event-Listener für Rechtsklick auf Kacheln hinzufügen, der ein Kontextmenü öffnet.
    - [x] Kontextmenü mit "Entfernen"-Option implementieren.
    - [x] Logik für den "Entfernen"-Button, die das DOM-Element der Kachel entfernt und ggf. die zugehörige JS-Instanz/Intervalle bereinigt.
- [x] **Testing**
    - [x] E2E-Test: Öffnet das Modal, fügt eine Uhr hinzu, verifiziert, dass sie im Grid erscheint.
    - [x] E2E-Test: Fügt eine Kachel hinzu, macht einen Rechtsklick, klickt auf "Entfernen", verifiziert, dass die Kachel verschwindet.
    - [x] E2E-Test: Verifiziert, dass mehrere Kacheln hinzugefügt und entfernt werden können

---

### **Phase 5: Komplexe Kacheln & Interaktivität**

*Ziel: Die Kernfunktionen der App durch komplexe, interaktive Kacheln implementieren.*

- [x] **Kachel: Tagesleiste**
    - [x] `<template id="template-timeline">` erstellt.
    - [x] `TimelineWidget`-Klasse in JS erstellt.
    - [x] Logik zur Berechnung und Visualisierung des Tagesablaufs (Start, Ende, Pausen, Termine) implementiert.
    - [x] Logik für den dynamischen Fortschrittsbalken implementiert.
    - [x] Alarm-Funktion (Bildschirm-Blinken via CSS-Klasse am `<body>`) implementiert.
- [x] **Kachel: Prompt-Bibliothek**
    - [x] `<template id="template-prompt-library">` für die Kachel erstellt.
    - [x] `<template>` für das Editor/Bibliothek-Modal erstellt.
    - [x] JavaScript-Logik zur Verwaltung der Prompts (Hinzufügen, Bearbeiten, Löschen, Kategorisieren).
    - [x] Reine JavaScript-Funktion zur Platzhalter-Ersetzung (`{{platzhalter}}`).
- [x] **Kachel: Design-Umschalter**
    - [x] `button#theme-toggle` in eine eigene Kachel umgewandelt.
    - [x] `<template>` und Logik für diese Kachel erstellt.
- [x] **Testing**
    - [x] E2E-Tests für die Kernfunktionalität jeder neuen Kachel geschrieben.

---

### **Phase 6: Datenpersistenz**

*Ziel: Den Zustand der App speichern, damit er Sitzungen überdauert.*

- [x] **Lokale Persistenz (`localStorage`)**
    - [x] Eine globale `state`-Variable in JS definiert, die Layout und Kachel-Daten enthält.
    - [x] Eine `saveStateToLocal()`-Funktion geschrieben, die den `state` als JSON in `localStorage` speichert.
    - [x] Eine `loadStateFromLocal()`-Funktion geschrieben, die beim Start den Zustand lädt und das Dashboard wiederherstellt.
    - [x] `saveStateToLocal()` nach jeder relevanten Änderung aufgerufen (Kachel hinzufügen/entfernen/verschieben).
- [ ] **Cloud-Persistenz (Firebase)**
    - [ ] Firebase SDKs (App, Auth, Firestore) via CDN im HTML einbinden.
    - [ ] Firebase-App mit den Konfigurationsdaten initialisieren.
    - [ ] UI und Logik für Google-Authentifizierung implementieren (Login/Logout-Button).
    - [ ] Funktionen `saveStateToFirestore()` und `loadStateFromFirestore()` implementieren.
    - [ ] Logik zur Synchronisation entwickeln (z.B. bei Login aus Cloud laden, bei Änderungen in Cloud speichern).
- [x] **Testing**
    - [x] E2E-Test: Ändert das Layout, lädt die Seite neu und verifiziert, dass das Layout aus `localStorage` wiederhergestellt wird.
    - [ ] E2E-Test (erfordert ggf. Mocking oder Test-Account): Loggt sich ein, verifiziert, dass Daten geladen werden.

---

### **Phase 7: Fortgeschrittene Funktionen & Politur**

*Ziel: Die App mit fortgeschrittenen UX-Features und robustem Fehlerhandling vervollständigen.*

- [ ] **Drag & Drop Layout**
    - [ ] Leichtgewichtige Bibliothek (z.B. SortableJS) via CDN einbinden.
    - [ ] SortableJS auf dem Grid-Container initialisieren.
    - [ ] Event-Handler für das `end`-Event implementieren, um die neue Kachel-Reihenfolge im App-Zustand zu speichern.
- [ ] **Kachel: Daten-Analyse**
    - [ ] `<template id="template-analytics">` erstellen.
    - [ ] `AnalyticsWidget`-Klasse erstellen, die Daten aus dem globalen State liest und aggregiert anzeigt.
- [ ] **Robustheit**
    - [ ] Generische Toast/Notification-Funktion (`showToast(message, type)`) implementieren.
    - [ ] Alle externen API-Aufrufe (Firebase) in `try...catch`-Blöcke kapseln und Fehler über die Toast-Funktion anzeigen.
    - [ ] Benutzerdefinierte Bestätigungsdialoge (`confirm()`) für kritische Aktionen wie das Löschen implementieren.
- [ ] **UI/UX Politur**
    - [ ] Responsivität auf verschiedenen Bildschirmgrößen final testen und CSS anpassen.
    - [ ] Animationen und Übergänge überprüfen und verfeinern.
    - [ ] Basis-Accessibility sicherstellen (ARIA-Labels für Buttons, logische Tab-Reihenfolge).

---

### **Phase 8: Abschluss & Deployment**

*Ziel: Das Projekt für die Veröffentlichung vorbereiten.*

- [ ] **Code-Qualität**
    - [ ] Gesamten Code auf Konsistenz und Lesbarkeit prüfen (Refactoring).
    - [ ] Unnötige `console.log`-Anweisungen und Test-Code entfernen.
    - [ ] Kommentare hinzufügen, wo die Logik komplex ist.
- [ ] **Finale Tests**
    - [ ] Alle E2E-Tests ausführen.
    - [ ] Manuelle End-to-End-Tests in den Zielbrowsern (Chrome, Firefox, Safari) durchführen.
- [ ] **Dokumentation & Hosting**
    - [ ] `README.md` mit finalen Screenshots und einer Beschreibung der Funktionen aktualisieren.
    - [ ] Die fertige `index.html`-Datei auf einem Hosting-Dienst bereitstellen (z.B. GitHub Pages, Netlify, Vercel).

```
