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

const multer = require("multer");
const fs = require("fs")

const bookModel = require("../models/book_model");
const BookDTO = require("../dtos/book_dto");

// Book service class
class BookService {
    constructor(booksStorePath) {
        this.booksStorePath = booksStorePath;

        // Setup files creatino middleware
        this.storage = multer.diskStorage({
            destination: (request, file, cb) => {
                const { title } = request.body;

                // Creatin direcory for book files with title without spaces as name
                const path = `${this.booksStorePath}/${title.replace(/\s+/g, '')}/`;
                fs.mkdirSync(path, { recursive: true });

                cb(null, path);
            },
            filename: function (request, file, cb) {
                // Creating file new by adding extestion to its fieldname
                let extArray = file.mimetype.split('/');
                let extension = extArray[extArray.length - 1];
                const name = `${file.fieldname}.${extension}`

                cb(null, name);
            }
        });    
        this.fields = [
            { name: 'image'     },
            { name: 'text'      },
            { name: 'speech'    },
            { name: 'speechMap' }
        ];
        this.createFiles = multer({ storage: this.storage }).fields(this.fields);
    }

    async create(title, author, year, description, price, files) {
        await bookModel.create({
            title,
            author,
            year,
            description,
            price,
            imagePath: files.image[0].path.slice(14),
            textPath: files.text[0].path.slice(14),
            speechPath: files.speech[0].path.slice(14),
            speechMapPath: files.speechMap[0].path.slice(14)            
        });
    }

    async data(id) {
        const book = await bookModel.find({ _id: id });
        if (!book) throw Error('Такой книги не существует.');

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