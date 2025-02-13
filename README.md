Version [PL](#aplikacja-do-zapisywania-i-zarządzania-wydarzeniami) | [ENG](#event-registration-and-management-app) | [Angular 2+ version](https://github.com/wersosn/projekt-angular)
# Aplikacja do zapisywania i zarządzania wydarzeniami
## Spis treści
- [Zespół](#zespół)
- [Opis](#opis)
- [Funkcjonalności](#funkcjonalności)
- [Technologie](#technologie)
- [Konfiguracja projektu](#konfiguracja-projektu)
- [Instrukcja użytkownika](#instrukcja-użytkownika)

## Zespół
Projekt został wykonany przez:
- [pawelsiemieniuk](https://github.com/pawelsiemieniuk)
- [Tomaszak420](https://github.com/Tomaszak420)
- [wersosn](https://github.com/wersosn)

## Opis
Aplikacja umożliwia użytkownikom zapisywanie się na wydarzenia organizowane przez administratora. Użytkownicy muszą się zarejestrować lub zalogować, aby brać udział w wydarzeniach. Aplikacja wyświetla wszystkie dostępne wydarzenia na stronie głównej, a użytkownik może wybrać wydarzenie, zapoznać się z jego szczegółami, a następnie wybrać godzinę, na którą chce się zapisać.

Po zapisaniu się na wydarzenie, dane o wydarzeniach, w których bierze udział użytkownik, są widoczne na jego koncie oraz w kalendarzu wydarzeń.

## Funkcjonalności
- **Rejestracja i logowanie użytkowników**: Użytkownicy mogą zarejestrować się i zalogować do aplikacji.
- **Lista dostępnych wydarzeń**: Wszystkie dostępne wydarzenia organizowane przez administratora są widoczne na stronie głównej aplikacji.
- **Szczegóły wydarzenia**: Użytkownicy mogą zobaczyć szczegóły wydarzenia, takie jak opis, data, godzina, lokalizacja oraz dostępność miejsc.
- **Zapis/wypis na wydarzenia**: Użytkownicy mogą zapisać/wypisywać się na wydarzenie, na które chcą się zapisać.
- **Kalendarz użytkownika**: Zapisane wydarzenia są widoczne na koncie użytkownika oraz w kalendarzu wydarzeń.
- **Zarządzanie wydarzeniami przez administratora**: Administratora może edytować,usuwać,tworzyć wydarzenia a nawet dodawać,usuwać wolontariuszy z wydarzeń.
- **Ograniczenie liczby miejsc**: Liczba dostępnych miejsc na wydarzeniu jest ograniczona. Po zapisaniu się użytkownika liczba dostępnych miejsc zmniejsza się.

## Technologie
- React + vite
- Node.js
- TypeScript
- JavaScript
- HTML
- SCSS

## Konfiguracja projektu

### Wymagania
 * Zainstalowany [Node.js](https://nodejs.org/) razem z menadżerem pakietów [npm](https://www.npmjs.com/get-npm)

### Przygotowanie projektu
Pobranie i przejście do głównego folderu projektu:
```
git clone https://github.com/wersosn/projekt-react.git 
cd projekt-react/ngo
```
Instalacja wymaganych pakietów:
```
npm install
```
Uruchomienie aplikacji w trybie deweloperskim:
```
npm run dev
```
Aplikacja zostanie uruchomiona lokalnie i dostępna pod adresem `http://localhost:5173/`

## Instrukcja użytkownika
Spis treści dostępny jest w pliku [README](https://github.com/wersosn/projekt-react/blob/master/instrukcja) w katalogu `instrukcja`

---
# Event Registration and Management app
## Table of contents
- [Team](#team)
- [Description](#description)
- [Functionalities](#functionalities)
- [Tech stack](#tech-stack)
- [Project setup](#project-setup)

## Team
The project was carried out by:
- [pawelsiemieniuk](https://github.com/pawelsiemieniuk)
- [Tomaszak420](https://github.com/Tomaszak420)
- [wersosn](https://github.com/wersosn)
  
## Description
This application allows users to register for events organized by an administrator. To participate in events, users must sign up or log in. The application displays all available events on the homepage, where users can browse event details and select a preferred time slot for registration. 

Once registered, users can view their scheduled events in their account dashboard and the event calendar.

## Functionalities
- **User Registration and Login**: Users can create an account and log in to access the application.
- **List of Available Events**: All events organized by the administrator are displayed on the homepage.
- **Event Details**: Users can view detailed information about an event, including its description, date, time, location, and available spots.
- **Event Registration and Cancellation**: Users can sign up for or cancel their registration for an event.
- **User Calendar**: Registered events are displayed in the user's account dashboard and the event calendar.
- **Event Management for Administrators**: Administrators can create, edit, and delete events, as well as add or remove volunteers from events.
- **Limited Capacity Management**: Events have a limited number of spots. Once a user registers, the number of available spots decreases accordingly.

## Tech stack
- React + vite
- Node.js
- TypeScript
- JavaScript
- HTML
- SCSS

## Project setup
### Requirements
Installed [Node.js](https://nodejs.org/) with the package manager [npm](https://www.npmjs.com/get-npm)

### Instalation steps
Clone the repository and navigate to the project folder:
```
git clone https://github.com/wersosn/projekt-react.git 
cd projekt-react/ngo
```
Install the required dependencies:
```
npm install
```
Run the application in development mode:
```
npm run dev
```
The application will be available locally at `http://localhost:5173/`

