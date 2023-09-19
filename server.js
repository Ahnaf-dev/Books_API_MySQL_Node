const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db.js'); // Import the database connection pool
const bookRouter = require("./routes/books");
const initTable = require("./tables/initTable");

app.use(express.json());

app.use("/api/books", bookRouter);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await initTable();
  
});