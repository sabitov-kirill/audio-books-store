/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Server entry point.
 *
 */

// Getting enviroment data
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "";

// Configuring server
const server = require('./models/server_model')(PORT, DB_URL);
server.applyMiddlewares();
server.handleRequests();
server.start();