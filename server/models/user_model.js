/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User model declaration module.
 *
 */

const mongoose = require('mongoose')

// User model schema definition
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true},
    password: { type: String },
    isAdmin: { type: Boolean },
    bagBooks: [{ type: mongoose.ObjectId, ref: 'Book' }],
    ownedBooks: { type: [mongoose.ObjectId] }
});

// User model creation
module.exports = new mongoose.model('User', userSchema);