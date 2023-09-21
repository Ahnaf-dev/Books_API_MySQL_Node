const express = require('express');
const router = express.Router();
const {getBook, createBook, updateBook, deleteBook, getBookDetails, getBooksByAuthor, searchBook} = require("../controllers/books");

router.get('/', getBook)
router.post('/', createBook)
router.get("/author/:id", getBooksByAuthor)
router.get("/search", searchBook)
router.put('/:id', updateBook)
router.get("/:id", getBookDetails)
router.delete('/:id', deleteBook)

module.exports = router;