const express = require('express');
const router = express.Router();
const {getBook, createBook, updateBook, deleteBook, getBookDetails, getBooksByAuthor} = require("../controllers/books");

router.get('/', getBook)
router.post('/', createBook)
router.get("/:id", getBookDetails)
router.get("/author/:id", getBooksByAuthor)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router;