const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Serve login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Serve the chat room
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Handle message form submission
router.post('/send', (req, res) => {
    const { username, message } = req.body;

    // Read existing messages
    let messages = fs.readFileSync('messages.txt', 'utf8');
    
    // Append the new message in the format: username:message
    if (messages) {
        messages += `:${username}:${message}`;
    } else {
        messages = `${username}:${message}`;
    }

    // Save updated messages back to file
    fs.writeFileSync('messages.txt', messages);

    res.redirect('/'); // Redirect back to the chat room
});

// Serve all messages
router.get('/messages', (req, res) => {
    const messages = fs.readFileSync('messages.txt', 'utf8') || '';
    const messagesArray = messages.split(':'); // Split the string into an array
    const formattedMessages = [];

    for (let i = 0; i < messagesArray.length; i += 2) {
        if (messagesArray[i] && messagesArray[i + 1]) {
            formattedMessages.push({
                username: messagesArray[i],
                message: messagesArray[i + 1]
            });
        }
    }

    res.json(formattedMessages);
});

module.exports = router;
