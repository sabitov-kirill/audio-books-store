/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Server handle module.
 *
 */

const express = require('express');
const Router = require('express').Router;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const UserController = require('./controllers/user_controller');
const BookController = require('./controllers/book_controller');

// Server model handle
class Server {
    applyMiddlewares() {
        this.app.use(express.text());
        this.app.use(cookieParser());
    }

    setUpRouter() {
        // Creting router
        this.router = new Router();

        // Authentication requests handle
        this.router.post('/user/create',  this.userController.create.bind(this.userController));
        this.router.post('/user/access',  this.userController.access.bind(this.userController));
        this.router.get('/user/reaccess', this.userController.validate.bind(this.userController), 
                                          this.userController.reAccess.bind(this.userController));
        this.router.post('/user/leave',   this.userController.leave.bind(this.userController));

        // Book interation requests
        this.router.post('api/books/create', this.bookController.upload.bind(this.bookController), 
                                             this.bookController.create.bind(this.bookController));
        this.router.get('api/books/data',    this.bookController.data.bind(this.bookController));
        this.router.get('api/books/cards',   this.bookController.cards.bind(this.bookController));
    }

    handleBaseRequests() {
        // Setting up router to handle api requests
        this.app.use('/api', this.router);
        this.app.post("/uploadImage", function (req, res) {
            // handle error ??
            if (!req.file) res.send("downloading error");
            else res.send("succes");
        });

        // Setting up react requests
        this.app.use(express.static(this.path.resolve(__dirname, '../client/public')));
        this.app.get('*', (request, result) => {
            /**
             * For production build:
             * result.sendFile(this.path.resolve(__dirname, '../client/build', 'index.html'));
             */
            let a = this.path.resolve(__dirname, '../client/public', 'index.html')
            result.sendFile(a);
        });
    }

    constructor(env, path) {
        // Callign interfaces constructors
        this.userController = new UserController(env.TOKEN_KEY);
        this.bookController = new BookController();

        // Creating http server
        this.app = express();
        this.server = require('http').createServer(this.app);

        // Setting up enviroment data
        this.port = env.PORT;
        this.databaseURL = env.DB_URL;
        this.booksPath = env.BOOKS_PATH;
        this.path = path;

        // Calling server initialisation functions
        this.applyMiddlewares();
        this.setUpRouter();
        this.handleBaseRequests();
    }

    async start() {
        try {
            // Connecting to mongoDB
            await mongoose.connect(this.databaseURL, {
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    
            // Listening on defined port
            this.server.listen(this.port, () => {
                console.log(`Server is listening on "${this.port}".`);
            });
        } catch (e) {
            console.log(`Server start error. ${e}.`)
        }
    }
}

module.exports = (env, path) => new Server(env, path);