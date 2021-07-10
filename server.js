const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json')

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// html routes
app.get('notes/', ( req, res ) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})