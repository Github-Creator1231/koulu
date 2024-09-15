const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Oletetaan, että tämä on hash, joka on tallennettu tietokantaan
const storedHash = '$2b$10$qvE8PTgunBORu3p7RQxGGuhVoHa.fhQqdQVAZ.uFbq5QnNViGE602'; // Replace this with the actual hashed password

// Route for login POST request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Compare the password
  bcrypt.compare(password, storedHash, (err, result) => {
    if (err) {
      res.status(500).send('Error');
      return;
    }

    if (result) {
      // Redirect to a "dashboard" page upon successful login
      res.redirect('/dashboard.html'); 
    } else {
      // Send an error message if login fails
      res.send('Incorrect username or password');
    }
  });
});

// Serve a simple dashboard page after login
app.get('/dashboard', (req, res) => {
  res.send('<h1>Welcome to your Dashboard</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});