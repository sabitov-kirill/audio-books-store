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

const path = require('path');
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
                cb(null, file.originalname);
            }
        });    
        this.fields = [
            { name: 'image'  },
            { name: 'pages'  },
            { name: 'audios' }
        ];
        this.createFiles = multer({ storage: this.storage }).fields(this.fields);
    }

    async create(title, year, description, price, isPremiere, pagesCount, files) {
        const book = await bookModel.create({
            title,
            year,
            description,
            price,
            isPremiere,
            pagesCount     
        });

        // Rename directory with book files
        const path = files.pages[0].destination;

        let splited_path = path.split('/');
        splited_path[splited_path.length - 2] = book._id; 
        const new_path = splited_path.join('/');
        
        fs.rename('../../' + path, new_path);
    }

    filePath(file) {
        return path.resolve(__dirname, `../${this.booksStorePath}/${file}`, 'index.html')
    }

    async cards() {
        const books = await bookModel.find({});
        const booksCards = books.map(book => {
            return new BookDTO(book);
        })
        return booksCards;
    }
}

module.exports = BookService;