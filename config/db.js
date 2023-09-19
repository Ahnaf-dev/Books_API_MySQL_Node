
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'test123456',
  database: 'book_schema',
  waitForConnections: true, // Optional
  connectionLimit: 10, // Optional
  queueLimit: 0, // Optional
});

module.exports = pool;