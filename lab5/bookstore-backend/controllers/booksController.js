const bookService = require('../services/bookService');

exports.getAllBooks = async (req, res) => {
    try{
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getBookById = async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
