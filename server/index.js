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
const path = require('path');

// Creating new server exemplar and running it
const server = require('./server')(process.env, path);
server.start();