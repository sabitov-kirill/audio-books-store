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

const multer = require('multer');

const bookModel = require("../models/book_model");
const BookDTO = require("../dtos/book_dto");

// Book service class
class BookService {
    constructor(booksStorePath) {
        this.booksStorePath = booksStorePath;

        // Middleware for handling uploaded files for book creation
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const { title } = JSON.parse(req.body);
                cb(null, `${booksStorePath}${title}/`);
            },
            filename: function (req, file, cb) {
                let extArray = file.mimetype.split('/');
                let extension = extArray[extArray.length - 1];
                cb(null, `${file.fieldname}.${extension}`);
            }
        });
        this.upload = multer({ storage });
    }

    async create(name, author, description, price, files) {
        if (!files['text'] || !files['speech'] || !files['speechMap']) {
            throw new Error('Not all book data files was loaded.')
        }

        await bookModel.create({
            name,
            author,
            description,
            price,
            dataPath: `${this.booksStorePath}${name}`            
        });
    }

    async data(id) {
        const book = await bookModel.find({ _id: id });
        if (!book) throw Error('This book does not exist');

        const bookDTO = new BookDTO(book);
        return new bookDTO.data();
    }

    async cards() {
        const books = await bookModel.find({});
        const booksCards = books.map(book => {
            const bookDTO = new BookDTO(book);
            return bookDTO.card();
        })
        return booksCards;
    }
}

module.exports = BookService;