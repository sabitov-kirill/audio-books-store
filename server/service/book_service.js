/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniel Konev
 *
 * PURPOSE:       Audio books web store application.
 *                Book service realisation module.
 *                Back-end part of book controller.
 *
 */

const bookModel = require("../models/book_model");

// this is path to directory with all required book data such as it's image or maybe
const path = '';

// Book service class
class BookService {
    async create(name, author, description, price, data) {
        fsPath = path.concat(name);
        const book = await bookModel.create({
            name,
            author,
            description,
            price,
            data,
            fsPath
        })
        .catch(error => {
            throw error;
        });
    }

    async get(name, author) {
        const book = await bookModel.findOne({ name: name, author: author });
        if (!book) throw Error('This book does not exist');

        return book;
    }

    async getAll() {
        const books = await bookModel.find({}, { name: 1, author: 1, description: 1, price: 1, img: 1 });
        return books;
    }
}

module.exports = new BookService();
