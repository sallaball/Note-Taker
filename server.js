const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const { Router } = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// attach css to html
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API is now on port ${PORT}!`);
})

