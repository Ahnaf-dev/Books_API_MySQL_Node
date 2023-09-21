const express = require('express');
const app = express();
const bookRouter = require("./routes/books");
const authorRouter = require("./routes/authors");


app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/authors", authorRouter);

module.exports = app;