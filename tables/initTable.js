const db = require("../config/db");

async function initializeTable() {
  try {
   
    const authorTableQuery = `CREATE TABLE IF NOT EXISTS authors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstname varchar(50),
      lastname varchar(50)
    )`


    const bookTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author_id INT,
      FOREIGN KEY (author_id) REFERENCES authors(id)
  )`

    await db.query(authorTableQuery);
    await db.query(bookTableQuery);

   
  } catch (error) {
    console.error('Error initializing the table:', error);
  }
}

module.exports = initializeTable;