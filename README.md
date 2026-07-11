# Join

Join ist eine webbasierte Kanban- und Aufgabenmanagement-App. Das Projekt wurde mit HTML, CSS und JavaScript umgesetzt und orientiert sich an bekannten Projektmanagement-Tools: Benutzer koennen sich anmelden, Kontakte verwalten, Aufgaben erstellen und diese in einem Board nach Status organisieren.

## Features

- Login, Registrierung und Gastzugang
- Uebersichtsseite mit Kennzahlen zu Aufgaben und Deadlines
- Kanban-Board mit den Spalten `To do`, `In progress`, `Await feedback` und `Done`
- Aufgaben erstellen, bearbeiten, loeschen und per Drag-and-drop verschieben
- Aufgaben mit Prioritaet, Kategorie, Deadline, Kontakten und Subtasks
- Suchfunktion fuer Board-Aufgaben
- Kontaktverwaltung mit Erstellen, Bearbeiten und Loeschen von Kontakten
- Responsive Layout fuer Desktop, Tablet und Mobile
- Rechtliche Seiten fuer Privacy Policy und Legal Notice
- Datenspeicherung ueber Firebase Realtime Database

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Firebase Realtime Database
- W3.js fuer HTML-Includes
- Google Fonts

## Projektstruktur

```text
.
|-- index.html                 # Login-Seite
|-- script.js                  # Globale Hilfsfunktionen
|-- style.css                  # Globale Styles
|-- css/                       # Seiten- und Komponenten-Styles
|-- img/                       # Icons, Logos und UI-Grafiken
|-- js/                        # JavaScript-Module fuer Login, Board, Tasks, Kontakte usw.
|-- templates/                 # HTML-Seiten und wiederverwendbare Layout-Templates
|-- out/                       # Generierte Dokumentation / Build-Ausgabe
```

## Installation und Start

1. Repository klonen:

```bash
git clone <repository-url>
cd Join
```

2. Projekt mit einem lokalen Webserver starten.

Da das Projekt HTML-Includes und externe Ressourcen nutzt, sollte es nicht direkt per Doppelklick als Datei geoeffnet werden. Empfohlen ist zum Beispiel die VS Code Erweiterung **Live Server**.

Alternativ kann ein einfacher lokaler Server verwendet werden:

```bash
python -m http.server 5500
```

Danach im Browser oeffnen:

```text
http://localhost:5500
```

## Nutzung

- Ueber `index.html` gelangt man zur Login-Seite.
- Mit **Guest Log in** kann die App ohne eigenen Account getestet werden.
- Nach dem Login fuehrt die App zur Summary-Seite.
- Ueber die Sidebar koennen Summary, Board, Add Task, Contacts und Help geoeffnet werden.
- Neue Aufgaben koennen auf der Add-Task-Seite oder direkt im Board erstellt werden.

## Datenbank

Die App verwendet eine Firebase Realtime Database. Die Basis-URL befindet sich in:

```text
js/database.js
```

Wenn du das Projekt mit einer eigenen Firebase-Datenbank verwenden moechtest, ersetze dort die `BASE_URL` durch deine eigene Realtime-Database-URL.

## Hinweise

- Fuer die korrekte Darstellung wird eine aktive Internetverbindung empfohlen, da externe Fonts und W3.js geladen werden.
- Die App speichert den aktuell angemeldeten Benutzer im `localStorage`.
- Das Projekt ist ein statisches Frontend und benoetigt keine npm-Installation.

## Autor

Erstellt im Rahmen der Developer Akademie.
