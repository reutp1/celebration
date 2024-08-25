const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Contact = require('./models/Contact');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // מאפשר לשרת קבצים סטטיים מהתיקיה public

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact message saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving contact message' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
