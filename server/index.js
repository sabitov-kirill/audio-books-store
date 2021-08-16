require('dotenv').config()

//
// Application requirements declaration
//
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(express.text());
app.use(cookieParser());

//
// Server setting up
//
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL || ""

async function startServer() {
    try {
        // connecting to mongoDB
        await mongoose.connect(DB_URL, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // listening on defined port
        server.listen(PORT, () => {
            console.log(`Server is listening on "${PORT}".`);
        });
    } catch (e) {
        console.log(`Server start error. ${e}.`)
    }
}

startServer();