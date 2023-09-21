const db = require("../config/db");

// CREATE an author
 const createAuthor = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
      return res.status(400).json({ error: 'Both firstname and lastname are required' });
    }

    const [result] = await db.query('INSERT INTO authors (firstname, lastname) VALUES (?, ?)', [firstname, lastname]);
    const newAuthorId = result.insertId;
    res.status(201).json({ id: newAuthorId, firstname, lastname });
  } catch (error) {
    console.error('Error creating an author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// READ all authors
 const getAuthor = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM authors');
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// READ an author by ID
const getAuthorDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM authors WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error retrieving an author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// UPDATE an author by ID
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    if (!firstname || !lastname) {
      return res.status(400).json({ error: 'Both firstname and lastname are required' });
    }

    const [result] = await db.query('UPDATE authors SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ id, firstname, lastname });
  } catch (error) {
    console.error('Error updating an author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// DELETE an author by ID
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM authors WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.sendStatus(204); // No content, successful deletion
  } catch (error) {
    console.error('Error deleting an author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createAuthor,
  getAuthor,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor
}