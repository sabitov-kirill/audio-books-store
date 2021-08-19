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
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const router = require('../router');

// image loader configurations. Not sure it should be here
const imagePath = '';
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, imagePath);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
  
    if (file.mimetype === "image/png" || 
        file.mimetype === "image/jpg"|| 
        file.mimetype === "image/jpeg") cb(null, true);
    else cb(null, false);
 }

// Server model handle
class Server {
    constructor(port, databaseURL) {
        this.app = express();
        this.server = require('http').createServer(this.app);

        this.port = port;
        this.databaseURL = databaseURL;
    }

    applyMiddlewares() {
        this.app.use(express.text());
        this.app.use(cookieParser());
        this.app.use(multer({storage: storageConfig, fileFilter: fileFilter}).single('imageData'));
        this.app.post("/uploadImage", function (req, res, next) {
            // handle error ??
            if (!req.file) res.send("downloading error");
            else res.send("succes");
        });
    }

    handleRequests() {
        // Have Node serve the files for our built React app
        this.app.use(express.static(path.resolve(__dirname, '../client/public')));

        // Api requests handle via router
        this.app.use('/api', router);

        // All other GET requests not handled before will return our React app
        this.app.get('*', (request, result) => {
            /**
             * For production build:
             * result.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
             */

            result.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
        });
    }

    async start() {
        try {
            // connecting to mongoDB
            await mongoose.connect(this.databaseURL, {
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    
            // listening on defined port
            this.server.listen(this.port, () => {
                console.log(`Server is listening on "${this.port}".`);
            });
        } catch (e) {
            console.log(`Server start error. ${e}.`)
        }
    }
}

module.exports = (port, databaseURL) => new Server(port, databaseURL);