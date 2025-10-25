const Book =require('../models/Book');
// @desc   create a new book
// @route  POST /api/books
// @access Private
const createBook = async (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   get all books for a user
// @route  GET /api/books
// @access Private
const getBooks = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// @desc   get a single book by id
// @route  GET /api/books/:id
// @access Private
const getBookById = async (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   update a book by id
// @route  PUT /api/books/:id
// @access Private
const updateBook = async (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   delete a book by id
// @route  DELETE /api/books/:id
// @access Private
const deleteBook = async (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc  update a book cover image
// @route  PUT /api/books/:id
// @access Private
const updateBookCover = async (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover
};