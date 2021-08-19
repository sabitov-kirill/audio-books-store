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

const BookService = require('../service/book_service');

// Book controller class
class BookController {
    constructor(storePath) {
        this.bookService = new BookService(storePath);
    }

    upload() {
        return this.bookService.upload;
    }

    async create(request, result) {
        try {
            const { title, author, description, price } = JSON.parse(request.body);
            const files = request.files;
            await this.bookService.create(title, author, description, price, files);
            
            result.sendStatus(200);
        } catch (error) {
            result.status(400).json({ error: error.message });
        } 
    }

    async data(request, result) {
        try {
            const { id } = JSON.parse(request.body);
            const book = await this.bookService.data(id);

            result.status(200).json(book);
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }

    async cards(request, result) {
        try {
            const books = await this.bookService.cards();

            result.status(200).json({ books });            
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }
}

module.exports = BookController;
