/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniel Konev
 *
 * PURPOSE:       Audio books web store application.
 *                Book constroller realisation module.
 *                Requests handler and interation with service.
 *
 */

const bookService = require('../service/book_service');

// Book controller class
class BookController {
    async create(request, result) {
        try {
            const { title, author, description, price, data } = JSON.parse(request.body);
            const book = await bookService.create(title, author, description, price, data);

            result.status(200).json({
                book: {
                    title: title,
                    author: author,
                    description: description,
                    price: price,
                    data: data,
                    image: book.img,
                }
            })
        } catch (error) {
            result.status(400).json({ error: error.message });
        } 
    }

    async getBook(request, result) {
        try {
            const { title, author } = JSON.parse(request.body);
            const book = await bookService.get(title, author);

            result.status(200).json({
                book: {
                    title: book.name,
                    author: book.author,
                    description: book.description,
                    price: book.price,
                    data: book.data,
                    image: book.img,
                }
            });
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }

    async getBooks(request, result) {
        try {
            const books = await bookService.getAll();
            result.status(200).json({ books });            
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookController();
