const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const PORT = process.env.PORT || 3002;
const app = express();


const { notes } = require('./db/db.json');

const readFiles = util.promisify(fs.readFile);
const writeFiles = util.promisify(fs.writeFile);


// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// attach css to html
app.use(express.static('public'));


// GET request
app.get('/api/notes', (req, res) => {
    readFiles("./db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data))
    res.json(notes);
})
});

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    res.json(id);
})


// Post request
app.post('/api/notes', (req, res) => {
    const note = req.body;
    readFiles("./db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = Math.floor(Math.random() *100000000)
        notes.push(note);
        return notes
    }) .then(function(notes) {
        writeFiles("./db/db.json", JSON.stringify(notes))
        res.json(notes);
    })
    });

    // Delete still under work
    app.delete("./notes/:id", (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
    });

    //HTML Routes
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
});

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

app.listen(PORT, () => {
    console.log(`API is now on port ${PORT}!`);
});

