const express = require('express');
const router = express.Router();
const {createAuthor,
  getAuthor,
  getAuthorDetail,
  updateAuthor,
  deleteAuthor} = require("../controllers/authors");

router.get('/', getAuthor)
router.post('/', createAuthor)
router.get("/:id", getAuthorDetail)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router;