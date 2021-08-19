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
    title:       { type: String },
    author:      { type: String },
    description: { type: String },
    price:       { type: Number },
    data:        { type: String }, // idk book store format, need to disc
    img:         { type: String },
});

module.exports = new mongoose.model('Book', bookSchema);