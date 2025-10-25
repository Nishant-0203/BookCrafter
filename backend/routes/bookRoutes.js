const express = require('express');
const router = express.Router();
const { 
    createBook, 
    getBooks, 
    getBookById, 
    updateBook, 
    deleteBook, 
    updateBookCover 
} = require('../controller/bookController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');  

// Apply protection middleware to all routes
router.use(protect);

// Routes
router.route('/')
    .post(createBook)
    .get(getBooks);

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook);

router.route('/cover/:id')
    .put(upload, updateBookCover);

module.exports = router;
