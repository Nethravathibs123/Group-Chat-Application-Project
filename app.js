const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serves static files like HTML, CSS

// Middleware for serving static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for handling messages
app.post('/send', (req, res) => {
    const { username, message } = req.body;

    // Save message to text file
    const messages = JSON.parse(fs.readFileSync('messages.txt', 'utf8') || '[]');
    messages.push({ username, message });
    fs.writeFileSync('messages.txt', JSON.stringify(messages, null, 2));

    res.status(201).json({ success: true });
});

// Route for fetching messages
app.get('/messages', (req, res) => {
    const messages = JSON.parse(fs.readFileSync('messages.txt', 'utf8') || '[]');
    res.json(messages);
});

// Route for clearing messages
app.delete('/clear', (req, res) => {
    fs.writeFileSync('messages.txt', JSON.stringify([], null, 2)); // Clear the messages file
    res.status(204).send(); // No content response
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
