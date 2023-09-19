const express = require('express');
const db = require('./config/db'); // Import the database connection module

const app = express();
app.use(express.json());

// GET data from a MySQL table
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM book';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});