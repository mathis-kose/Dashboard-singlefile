Absolut. Als Systemarchitekt verstehe ich die Notwendigkeit von Präzision und einem unerschütterlichen Plan, insbesondere bei einer so einzigartigen architektonischen Anforderung wie einer Single-File-Applikation. Wir werden dieses Projekt mit der Sorgfalt eines Uhrmachers aufbauen – Stück für Stück, iterativ und mit ständiger Verifizierung. Jeder Schritt wird logisch auf dem vorherigen aufbauen, sodass am Ende ein robustes, integriertes und fehlerfreies Ganzes entsteht.

Das Ziel ist nicht nur, die App zu bauen, sondern einen Prozess zu schaffen, der die Komplexität beherrschbar macht und die Qualität in jeder Phase sicherstellt. Wir werden eine Reihe von atomaren Prompts für ein LLM erstellen, die diesen Prozess widerspiegeln.

---

### **Projekt: Tagesbegleiter - Der übergeordnete Schlachtplan**

Unser Vorgehen gliedert sich in klar definierte Phasen. Jede Phase stellt einen Meilenstein dar und liefert einen sichtbaren, testbaren Fortschritt.

*   **Phase 1: Das Fundament (Grundstruktur & Theming)**
    *   Erstellen der leeren Hülle (`index.html`).
    *   Aufbau der grundlegenden CSS-Struktur mit Variablen für Light/Dark-Themes.
    *   Implementierung der Theme-Umschaltlogik.

*   **Phase 2: Visuelles Grundgerüst (Layout & Neumorphismus)**
    *   Einrichten des CSS Grids.
    *   Styling der Basis-Kachel im Neumorphismus-Design.
    *   Implementierung des "Gedrückt"-Effekts.

*   **Phase 3: Der erste Bewohner (Die Uhr-Kachel)**
    *   Erstellen der HTML-Vorlage (`<template>`) für die Uhr.
    *   Entwicklung der `ClockWidget`-Klasse in JavaScript zur Steuerung der Logik.
    *   Instanziierung der Uhr und Integration in das Grid.

*   **Phase 4: Dynamische Kachel-Verwaltung**
    *   Erstellen der UI für das Hinzufügen von Kacheln (Modal).
    *   Implementierung der Logik zum dynamischen Hinzufügen von Kacheln aus Vorlagen.
    *   Implementierung der Logik zum Entfernen von Kacheln.

*   **Phase 5: Komplexe Kacheln & Interaktivität**
    *   Implementierung der Tagesleiste (`TimelineWidget`).
    *   Implementierung der Prompt-Bibliothek (inkl. Modal-Logik).

*   **Phase 6: Datenpersistenz**
    *   Implementierung der Speicherung des Kachel-Layouts und der Zustände im `localStorage`.
    *   Integration von Firebase (via CDN) für Authentifizierung und Cloud-Speicherung.

*   **Phase 7: Fortgeschrittene Funktionen & Politur**
    *   Integration von Drag & Drop für die Kacheln.
    *   Implementierung der Daten-Analyse-Kachel.
    *   Feinschliff der UI/UX und Fehlerbehandlung.

---

### **Phase 1: Das Fundament (Grundstruktur & Theming)**

Hier legen wir den Grundstein. Nach dieser Phase haben wir eine leere, aber funktionierende Seite, deren Design wir auf Knopfdruck ändern können.

#### **Prompt 1.1: Erstellen der grundlegenden HTML-Dateistruktur**

Kontext: Dies ist der absolut erste Schritt. Wir erstellen die leere Hülle der `index.html` gemäß der Spezifikation. Dies gibt uns die grundlegende Struktur, auf der alles andere aufbaut.

```text
Erstelle eine einzelne HTML-Datei namens `index.html`.
Die Datei soll die folgende Struktur haben:
1.  Standard-HTML5-Boilerplate (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`).
2.  Im `<head>`: `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">` und ein `<title>` "Tagesbegleiter".
3.  Im `<head>`: Ein leerer `<style>`-Block für zukünftige CSS-Regeln.
4.  Im `<body>`: Ein `<main id="dashboard-grid"></main>`-Element.
5.  Am Ende des `<body>`: Ein leerer `<script type="module">`-Block für unsere Applikationslogik.
6.  Füge innerhalb des `<script>`-Blocks zur Verifizierung einen einfachen `console.log("App-Skript geladen.");` hinzu.
```

#### **Prompt 1.2: Einrichten der CSS-Variablen für das Theming**

Kontext: Jetzt definieren wir die Farbpalette als CSS-Variablen. Dies ermöglicht es uns, das gesamte Design der App zentral zu steuern. Wir definieren Variablen für den Light-Mode (Standard) und überschreiben sie dann für den Dark-Mode.

```text
Füge innerhalb des `<style>`-Blocks in der `index.html` die folgenden CSS-Regeln hinzu:

1.  Einen `:root`-Selektor, der die CSS-Variablen für das Light-Theme definiert. Er sollte mindestens enthalten:
    *   `--background-color: #e0e5ec;`
    *   `--text-color: #333;`
    *   `--shadow-light: #ffffff;`
    *   `--shadow-dark: #a3b1c6;`
    *   `--accent-color-start: #8e9eab;`
    *   `--accent-color-end: #eef2f3;`

2.  Einen `[data-theme="dark"]`-Selektor, der dieselben Variablen für das Dark-Theme überschreibt. Er sollte mindestens enthalten:
    *   `--background-color: #2c2f33;`
    *   `--text-color: #e0e5ec;`
    *   `--shadow-light: #3a3e42;`
    *   `--shadow-dark: #1e2023;`
    *   `--accent-color-start: #4b6cb7;`
    *   `--accent-color-end: #182848;`

3.  Grundlegende `body`-Stile, die diese Variablen verwenden:
    *   Setze `background-color` und `color` auf die entsprechenden Variablen.
    *   Füge `font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;` hinzu.
    *   Füge eine sanfte `transition: background-color 0.3s ease, color 0.3s ease;` hinzu.

4.  Setze das Attribut `data-theme="light"` auf das `<body>`-Tag im HTML.
```

#### **Prompt 1.3: Implementierung der Theme-Umschaltlogik**

Kontext: Wir brauchen eine Möglichkeit, das Theme zu wechseln. Wir fügen einen einfachen Button und die zugehörige JavaScript-Logik hinzu, um das `data-theme`-Attribut auf dem Body umzuschalten. Dies ist unser erster interaktiver Baustein.

```text
Füge der `index.html` die folgenden Elemente hinzu:

1.  **HTML:** Füge direkt innerhalb des `<body>`-Tags, vor dem `<main>`-Element, einen Button hinzu: `<button id="theme-toggle">Theme wechseln</button>`.

2.  **JavaScript:** Füge innerhalb des `<script type="module">`-Blocks den folgenden Code hinzu, um den Button funktionsfähig zu machen:
    *   Warte, bis das DOM vollständig geladen ist (`DOMContentLoaded`).
    *   Hole dir den Button über seine ID (`theme-toggle`).
    *   Hole dir das `body`-Element.
    *   Füge einen `click`-Event-Listener zum Button hinzu.
    *   Innerhalb des Listeners:
        *   Prüfe das aktuelle `data-theme`-Attribut des `body`.
        *   Wenn es 'light' ist, setze es auf 'dark'.
        *   Andernfalls setze es auf 'light'.
```

---

### **Phase 2: Visuelles Grundgerüst (Layout & Neumorphismus)**

Jetzt, wo das Fundament steht, geben wir der App ihr charakteristisches Aussehen.

#### **Prompt 2.1: Einrichten des CSS-Grid-Layouts**

Kontext: Das Dashboard basiert auf einem Grid. Wir definieren das CSS für den `#dashboard-grid`-Container, um Kacheln aufnehmen zu können.

```text
Füge dem `<style>`-Block in `index.html` die folgenden CSS-Regeln für `#dashboard-grid` hinzu:

1.  Setze `display: grid;`.
2.  Definiere Spalten mit `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));`. Dies sorgt für ein responsives Grid.
3.  Definiere eine automatische Zeilenhöhe mit `grid-auto-rows: 120px;`.
4.  Füge einen Abstand zwischen den Grid-Elementen hinzu mit `gap: 20px;`.
5.  Füge etwas Padding hinzu, z.B. `padding: 20px;`.
```

#### **Prompt 2.2: Styling der Basis-Kachel (Neumorphismus)**

Kontext: Dies ist ein Kernstück des Designs. Wir erstellen eine allgemeine `.tile`-Klasse, die den Neumorphismus-Effekt mit den zuvor definierten CSS-Variablen umsetzt.

```text
Füge dem `<style>`-Block in `index.html` die folgenden CSS-Regeln hinzu:

1.  Erstelle eine Klasse `.tile`.
2.  Style sie mit den folgenden Eigenschaften:
    *   `padding: 15px;`
    *   `border-radius: 20px;`
    *   `background: var(--background-color);`
    *   `color: var(--text-color);`
    *   `box-shadow: 7px 7px 15px var(--shadow-dark), -7px -7px 15px var(--shadow-light);`
    *   `transition: all 0.2s ease-in-out;`
    *   `display: flex;`
    *   `justify-content: center;`
    *   `align-items: center;`
    *   `font-size: 1.2rem;`

2.  **Zum Testen:** Füge temporär eine Kachel direkt in das `<main id="dashboard-grid">`-Element im HTML ein: `<div class="tile">Test</div>`.
```

#### **Prompt 2.3: Implementierung des "Gedrückt"-Effekts**

Kontext: Eine Schlüsseleigenschaft des Neumorphismus ist das taktile Feedback. Wir fügen einen `:active`-Zustand für Kacheln hinzu, der den Schatten umkehrt und den Eindruck erweckt, die Kachel würde in die Oberfläche gedrückt.

```text
Füge dem `<style>`-Block in `index.html` eine neue CSS-Regel für den `:active`-Zustand der `.tile`-Klasse hinzu:

1.  Erstelle den Selektor `.tile:active`.
2.  Setze den `box-shadow` auf einen "inset"-Schatten, der die Farben umkehrt:
    `box-shadow: inset 7px 7px 15px var(--shadow-dark), inset -7px -7px 15px var(--shadow-light);`
3.  Setze `font-size` leicht herab, um den Effekt zu verstärken, z.B. `font-size: 1.18rem;`.
```

---

### **Phase 3: Der erste Bewohner (Die Uhr-Kachel)**

Jetzt erwecken wir das Dashboard zum Leben, indem wir die erste funktionale Kachel hinzufügen.

#### **Prompt 3.1: Erstellen der HTML-Vorlage für die Uhr**

Kontext: Wir verwenden das `<template>`-Element, um wiederverwendbare Kachel-Strukturen zu definieren. Dies hält unser HTML sauber und unsere Logik modular.

```text
Füge der `index.html` die folgenden Elemente hinzu:

1.  **Entferne** die temporäre Test-Kachel (`<div class="tile">Test</div>`) aus dem `<main>`-Element.
2.  **Füge** nach dem `<main>`-Element und vor den `<script>`-Tags eine HTML-Vorlage für die Uhr hinzu:
    ```html
    <template id="template-clock">
        <div class="tile clock-tile">
            <div class="clock-time">00:00:00</div>
        </div>
    </template>
    ```
3.  **Füge** im `<style>`-Block spezifische Stile für die Uhr hinzu:
    ```css
    .clock-tile {
        flex-direction: column;
    }
    .clock-time {
        font-size: 2rem;
        font-weight: 600;
        color: var(--text-color);
        letter-spacing: 2px;
    }
    ```
```

#### **Prompt 3.2: Erstellen der ClockWidget-Klasse**

Kontext: Wir kapseln die Logik für jede Kachel in einer eigenen Klasse. Das macht den Code organisiert und wiederverwendbar. Die `ClockWidget`-Klasse ist für die Aktualisierung der Zeitanzeige in einem bestimmten DOM-Element verantwortlich.

```text
Erweitere den `<script type="module">`-Block in `index.html` um eine JavaScript-Klasse namens `ClockWidget`.

1.  Definiere die Klasse `ClockWidget`.
2.  Der `constructor` soll ein DOM-Element als Argument annehmen (die Kachel-Instanz). Er soll dieses Element in einer Eigenschaft speichern (z.B. `this.element`) und das darin enthaltene Zeitanzeige-Element finden und speichern (z.B. `this.timeDisplay = this.element.querySelector('.clock-time');`).
3.  Erstelle eine Methode `updateTime()`, die:
    *   Die aktuelle Zeit mit `new Date()` holt.
    *   Stunden, Minuten und Sekunden formatiert, sodass sie immer zweistellig sind (z.B. `09` statt `9`).
    *   Den formatierten Zeitstring (z.B. `HH:MM:SS`) zusammenbaut.
    *   Den `textContent` von `this.timeDisplay` auf den neuen Zeitstring setzt.
4.  Erstelle eine Methode `start()`, die:
    *   `updateTime()` sofort einmal aufruft, um die Zeit initial anzuzeigen.
    *   `setInterval` verwendet, um `updateTime()` jede Sekunde aufzurufen. Speichere die Intervall-ID in einer Eigenschaft (z.B. `this.intervalId`), damit wir sie später stoppen können.
```

#### **Prompt 3.3: Instanziieren und Anzeigen der Uhr-Kachel**

Kontext: Jetzt verbinden wir die Vorlage und die Klasse. Im Hauptskript klonen wir die Vorlage, fügen sie dem Grid hinzu und erstellen eine neue `ClockWidget`-Instanz, um sie zu steuern.

```text
Füge am Ende des `DOMContentLoaded`-Listeners im `<script type="module">`-Block den folgenden Initialisierungscode hinzu:

1.  Hole dir die Uhr-Vorlage (`template-clock`) und das Grid-Element (`dashboard-grid`) aus dem DOM.
2.  Klone den Inhalt der Vorlage mit `templateClock.content.cloneNode(true)`.
3.  Hole dir das `.clock-tile`-Element aus dem geklonten Inhalt.
4.  Füge das geklonte Kachel-Element an das Grid-Element an (`dashboardGrid.appendChild(...)`).
5.  Erstelle eine neue Instanz der `ClockWidget`-Klasse und übergib ihr das neu erstellte Kachel-Element: `const clock = new ClockWidget(clockElement);`.
6.  Rufe die `start()`-Methode der neuen Instanz auf: `clock.start();`.
```

---

Diese ersten drei Phasen bilden ein stabiles, funktionierendes und gut aussehendes Fundament. Die nächsten Prompts würden auf genau diesem Code aufbauen, um die Kachel-Verwaltung, weitere Kacheln und die Datenpersistenz zu implementieren, wobei stets die gleiche granulare, testgetriebene Vorgehensweise beibehalten wird. Jeder Prompt liefert ein kleines, aber vollständiges Stück Funktionalität, das nahtlos in das bestehende Ganze integriert wird.
