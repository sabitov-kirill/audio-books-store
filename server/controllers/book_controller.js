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
    constructor(booksStorePath) {
        this.bookService = new BookService(booksStorePath);

        // Files uploading middleware
        this.uploadFiles = this.bookService.createFiles;
    }

    async create(request, result) {
        try {
            // const { title, author, description, price } = request.body;
            const { title, author, year, description, price } = request.body;
            const files = request.files;
            await this.bookService.create(title, author, Number(year), description, Number(price), files);
            
            result.sendStatus(200);
        } catch (error) {
            result.status(400).json({ error: error.message });
        } 
    }

    async sendData(request, result) {
        try {
            const { id } = JSON.parse(request.body);
            const book = await this.bookService.data(id);

            result.status(200).json(book);
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }

    async sendCards(request, result) {
        try {
            const books = await this.bookService.cards();

            result.status(200).json({ books });            
        } catch (error) {
            result.status(400).json({ error: error.message });
        }
    }
}

module.exports = BookController;
