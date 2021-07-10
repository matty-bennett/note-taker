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

// function for creating note data
function createNoteData(note) {
    fs.writeFile('./db/db.json', JSON.stringify(note), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('updated database');
        return true;
    })
}


//-- get routes --//

// get notes page
app.get('/notes', ( req, res ) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// get all notes
app.get('/api/notes', ( req, res ) => {
    res.json(notes);
})

// get landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


// create new note
app.post('/api/notes', ( req,res ) => {
    let newNote = req.body;

    req.body.id = notes.length.toString();
    notes.push(newNote);
    console.log("Note has been created");
    createNoteData(notes);
    req.json(req.body);
}) 


app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}!`);
})