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
        notes = [].concat(JSON.parse(data))
    res.json(notes);
})
});

app.post('/api/notes', (req, res) => {});

app.listen(PORT, () => {
    console.log(`API is now on port ${PORT}!`);
})

