const Book =require('../models/Book');
// @desc   create a new book
// @route  POST /api/books
// @access Private
const createBook = async (req, res) => {
    try {
        const { title, author, subtitle, chapters } = req.body;

        if(!title || !author) {
            return  res.status(400).json({ message: "Title and Author are required" });
        }

        const book = await Book.create({
            userId: req.user.id,
            title,
            author,
            subtitle,
            chapters,
        });
        res.status(201).json(book);
    }
    catch (error) {
        console.error("Create book error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   get all books for a user
// @route  GET /api/books
// @access Private
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(books);
    } catch (error) {
        console.error("Get books error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
// @desc   get a single book by id
// @route  GET /api/books/:id
// @access Private
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized to view this book" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error("Get book by ID error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc   update a book by id
// @route  PUT /api/books/:id
// @access Private
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ message: "Server error"});
    }
};

// @desc   delete a book by id
// @route  DELETE /api/books/:id
// @access Private
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this book" });
        }
        await book.deleteOne();
        res.status(200).json({ message: "Book removed" });
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
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if(book.userId.toString() !== req.user.id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }
        if(req.file){
            book.coverImage = `${req.file.path}`;
        }
        else{
            return res.status(400).json({ message: "No file uploaded" });
        }
        const updatedBook =  await book.save();
        res.status(200).json(updatedBook);
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