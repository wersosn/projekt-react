const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const eventsFilePath = './event.json';
const usersFilePath = './users.json';
// Funkcja do odczytywania wydarzeń z pliku JSON
const loadEvents = () => {
  try {
    const data = fs.readFileSync(eventsFilePath, 'utf-8');
    console.log(data);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading events file:', err);
    return [];
  }
};
const loadUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    // Sprawdzenie, czy plik jest pusty
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data); // Parsowanie JSON
  } catch (err) {
    // Obsługa błędów przy odczycie i parsowaniu pliku
    console.error('Błąd odczytu lub parsowania pliku users.json:', err);
    return [];
  }
};



// Endpoint do logowania
app.post('/login', (req, res) => {
  let users = loadUsers();
  const { login, password } = req.body;
  const user = users.find(user => user.login === login && user.password === password);

  if (user) {

    res.status(200).json({ message: 'Zalogowano pomyślnie', user });
  } else {
    res.status(401).json({ message: 'Nieprawidłowy login lub hasło' });
  }
});
let users = loadUsers();
// Endpoint do rejestracji
app.post('/register', (req, res) => {
  const newUser = req.body;
  console.log(newUser);

  // Sprawdzenie, czy użytkownik o danym loginie już istnieje
  fs.readFile(usersFilePath, (err, data) => {
    if (err) {
      console.error('Błąd odczytu pliku users.json:', err);
      return res.status(500).send('Błąd serwera');
    }

    const users = JSON.parse(data); // Parse the data to get the existing users
    const existingLogin = users.find(user => user.login === newUser.login);
    const existingEmail = users.find(user => user.email === newUser.email);
    if (existingLogin) {
      return res.status(400).json({ message: 'Użytkownik o tym loginie już istnieje.' });
    }
    if (existingEmail) {
      return res.status(400).json({ message: 'Email został już użyty.' });
    }

    // Automatyczne przypisanie ID
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

    const userToAdd = {
      id: newId,
      role: 'user',
      login: newUser.login,
      password: newUser.password,
      name: newUser.firstName,
      surname: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      gender: newUser.gender,
      events: [] // Pusta lista 'events' dla nowego użytkownika
    };

    // Dodanie nowego użytkownika do tablicy użytkowników
    users.push(userToAdd);

    // Zapisanie danych z powrotem do pliku
    saveUsers(users);

    // Odpowiedź serwera, że użytkownik został zarejestrowany
    res.status(201).json({ message: 'Użytkownik został pomyślnie zarejestrowany.', user: userToAdd });
  });
});

app.get('/users', (req, res) => {
  const users = loadUsers();
  if (users) {
    res.status(200).json(users); // Zwrócenie wszystkich użytkowników
  } else {
    res.status(404).json({ message: 'Brak użytkowników' }); // Jeśli nie ma żadnego użytkownika
  }
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10); // Pobieranie ID użytkownika z parametru URL
  const users = loadUsers(); // Wczytanie danych użytkowników z pliku
  const user = users.find(user => user.id === userId); // Znalezienie użytkownika po ID

  if (user) {
    res.status(200).json(user); // Zwrócenie danych użytkownika w odpowiedzi
  } else {
    res.status(404).json({ message: 'Użytkownik nie znaleziony' }); // Jeśli użytkownik nie istnieje
  }
});
// Endpoint do pobierania akcji użytkownika na podstawie jego ID
app.get('/users/:id/events', (req, res) => {
  const userId = parseInt(req.params.id, 10); // Pobieramy ID użytkownika z parametru URL
  const users = loadUsers(); // Wczytanie danych użytkowników z pliku
  const user = users.find(user => user.id === userId); // Znajdź użytkownika po ID

  if (!user) {
    return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
  }

  // Załaduj wszystkie wydarzenia
  const events = loadEvents();
  // Wybierz tylko te wydarzenia, których ID znajdują się w tablicy 'events' użytkownika
  const userEvents = events.filter(event => user.events.includes(event.id));

  res.status(200).json(userEvents); // Zwróć wydarzenia użytkownika
});



// Funkcja do zapisywania wydarzeń do pliku JSON
const saveEvents = (events) => {
  try {
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2));
  } catch (err) {
    console.error('Error writing events file:', err);
  }
};

// Inicjalizacja tablicy events z danych w pliku JSON
let events = loadEvents();

// Get do pobierania wszystkich wydarzeń
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Get do konkretnego wydarzenia
app.get('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find(e => e.id === eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

// Post do dodawania nowego wydarzenia
app.post('/api/events', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  saveEvents(events);
  res.status(201).json(newEvent);
});

// Post do edycji wydarzenia
app.put('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const updatedEvent = req.body;
  // Znajdź wydarzenie po ID i zaktualizuj
  let event = events.find(e => e.id === eventId);
  if (event) {
    Object.assign(event, updatedEvent);
    saveEvents(events);
    res.status(200).json(event);
  } else {
    res.status(404).send('Event not found edit');
  }
});

// Delete do usuwania wydarzenia
app.delete('/api/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const eventIndex = events.findIndex(e => e.id === eventId);

  if (eventIndex !== -1) {
    // Usuń wydarzenie z tablicy
    const deletedEvent = events.splice(eventIndex, 1)[0];
    saveEvents(events); // Zapisz zmienioną listę do pliku
    console.log(events);
    res.status(200).json(deletedEvent);
  } else {
    res.status(404).send('Event not found');
  }
});

// Funkcja do zapisywania użytkowników do pliku
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
  }
};

// POST do edycji użytkownika
app.put('/users/:id', (req, res) => {
  let users = loadUsers();
  const userId = parseInt(req.params.id, 10);  // Pobranie ID użytkownika z parametru
  const updatedUser = req.body;  // Pobranie danych z ciała żądania

  // Znajdź użytkownika po ID
  let user = users.find(u => u.id === userId);

  if (user) {
    Object.assign(user, updatedUser);
    saveUsers(users);
    res.status(200).json(user);
  } else {

    res.status(404).send('User not found');
  }
});


// Uruchomienie serwera na porcie 3000
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
