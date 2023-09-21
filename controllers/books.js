const db = require("../config/db");

const getBook = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getBookDetails = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await db.query(`SELECT * FROM books WHERE id = ?`, [id])

    if (rows.length < 1) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json(rows)


  } catch(error) {
    console.error('Error getting book details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM authors WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    const [bookRows] = await db.query(`SELECT title, CONCAT(firstname, ' ', lastname) as author 
    FROM books b
    INNER JOIN authors a ON a.id = b.author_id
    WHERE b.author_id = ?`, [id]);

    if (bookRows.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(bookRows);
    
  } catch(error) {
    console.error('Error retrieving author books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const createBook = async (req, res) => {
  try {
    const { title, id } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (id) {
      const [rows] = await db.query('SELECT * FROM authors WHERE id = ?', [id]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Author not found' });
      }

    }

    const [result] = await db.query('INSERT INTO books (title, author_id) VALUES (?, ?)', [title, id]);
    const newBookId = result.insertId;
    res.status(201).json({ id: newBookId, title });
  } catch (error) {
    console.error('Error creating a book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const [result] = await db.query('UPDATE books SET title = ? WHERE id = ?', [title, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ id, title });
  } catch (error) {
    console.error('Error updating a book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.sendStatus(204); // No content, successful deletion
  } catch (error) {
    console.error('Error deleting a book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getBookDetails,
  getBooksByAuthor,
}