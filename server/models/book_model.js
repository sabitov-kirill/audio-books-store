/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniel Konev
 *
 * PURPOSE:       Audio books web store application.
 *                Book model declaration module.
 *
 */

const mongoose = require("mongoose");

// Book model schema definition
const bookSchema = new mongoose.Schema({
    title:         { type: String },
    year:          { type: Number },
    description:   { type: String },
    price:         { type: Number },
    status:        { type: String },
    pagesCount:    { type: Number }
});

module.exports = new mongoose.model('Book', bookSchema);