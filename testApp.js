const express = require('express');
const app = express();
const bookRouter = require("./routes/books");

app.use(express.json());

app.use("/api/books", bookRouter);

module.exports = app;