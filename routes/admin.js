const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Serve the admin dashboard
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html')); // Adjust path if necessary
});

// Example route to manage messages
router.get('/messages', (req, res) => {
    // Read messages from the file
    const messages = JSON.parse(fs.readFileSync('messages.txt', 'utf8'));
    res.json(messages); // Return messages in JSON format
});

// Optionally, you can add more routes to handle admin functionalities here

module.exports = router;
