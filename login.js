const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware für das Parsen von Anfragekörpern und Sessions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'geheimnisvolles-geheimnis',
  resave: false,
  saveUninitialized: false
}));

// Endpunkt für die Anmeldung
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Hier sollten Sie Code einfügen, um die Benutzerdaten aus der Datenbank zu überprüfen

  if (username === 'richtiger-benutzername' && password === 'richtiges-passwort') {
    req.session.loggedin = true;
    res.redirect('/privater-bereich.html');
  } else {
    res.send('Benutzername oder Passwort ist falsch.');
  }
});

// Endpunkt für den privaten Bereich
app.get('/privater-bereich.html', (req, res) => {
  if (req.session.loggedin) {
    res.send('Willkommen im privaten Bereich!');
  } else {
    res.redirect('/');
  }
});

// Starten Sie den Server
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
