const express = require("express");

const app = express();

const PORT = 3000;


// Allow the server to read JSON request bodies
app.use(express.json());


// ================================
// BOOK DATA
// ================================

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear"
    }
];


// ================================
// GET ALL BOOKS
// GET /books
// ================================

app.get("/books", function (req, res) {

    res.status(200).json(books);

});


// ================================
// ADD A NEW BOOK
// POST /books
// ================================

app.post("/books", function (req, res) {

    const { title, author } = req.body;


    if (!title || !author) {

        return res.status(400).json({
            message: "Title and author are required"
        });

    }


    const newBook = {

        id: books.length > 0
            ? books[books.length - 1].id + 1
            : 1,

        title: title,

        author: author

    };


    books.push(newBook);


    res.status(201).json(newBook);

});


// ================================
// UPDATE A BOOK
// PUT /books/:id
// ================================

app.put("/books/:id", function (req, res) {

    const bookId = parseInt(req.params.id);

    const book = books.find(function (book) {

        return book.id === bookId;

    });


    if (!book) {

        return res.status(404).json({
            message: "Book not found"
        });

    }


    const { title, author } = req.body;


    if (title) {
        book.title = title;
    }

    if (author) {
        book.author = author;
    }


    res.status(200).json(book);

});


// ================================
// DELETE A BOOK
// DELETE /books/:id
// ================================

app.delete("/books/:id", function (req, res) {

    const bookId = parseInt(req.params.id);


    const bookIndex = books.findIndex(function (book) {

        return book.id === bookId;

    });


    if (bookIndex === -1) {

        return res.status(404).json({
            message: "Book not found"
        });

    }


    const deletedBook = books.splice(bookIndex, 1);


    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });

});


// ================================
// START SERVER
// ================================

app.listen(PORT, function () {

    console.log(`Server is running on http://localhost:${PORT}`);

});