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
        this.router.post('/user/create',  this.userController.add.bind(this.userController));
        this.router.post('/user/access',  this.userController.access.bind(this.userController));
        this.router.get('/user/reaccess', this.userController.validate.bind(this.userController), 
                                          this.userController.reAccess.bind(this.userController));
        this.router.post('/user/leave',   this.userController.leave.bind(this.userController));

        // Book interactions requests
        this.router.post('/books/create', this.userController.validate.bind(this.userController),
                                          this.userController.validateAdmin.bind(this.userController),
                                          this.bookController.uploadFiles,
                                          this.bookController.create.bind(this.bookController));
        this.router.get('/books/data',    this.userController.validate.bind(this.bookController),
                                          this.userController.validateBookOwnership.bind(this.bookController),
                                          this.bookController.sendData.bind(this.bookController));
        this.router.get('/books/cards',   this.bookController.sendCards.bind(this.bookController));
    }

    handleBaseRequests() {
        // Setting up router to handle api requests
        this.app.use('/api', this.router);

        // Setting up react requests
        this.app.use(express.static(this.path.resolve(__dirname, '../client/build')));
        this.app.get('*', (request, result) => {
            result.sendFile(this.path.resolve(__dirname, '../client/build', 'index.html'));
        });
    }

    constructor(env, path) {
        // Callign interfaces constructors
        this.userController = new UserController(env.TOKEN_KEY, env.ADMIN_TOKEN_KEY);
        this.bookController = new BookController(env.BOOKS_PATH);

        // Creating http server
        this.app = express();
        this.server = require('http').createServer(this.app);

        // Setting up enviroment data
        this.port = env.PORT;
        this.databaseURL = env.DB_URL;
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