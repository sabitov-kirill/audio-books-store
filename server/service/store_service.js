/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniel Konev
 *
 * PURPOSE:       Audio books web store application.
 *                Books store service realisation module.
 *
 */
 
const userModel = require("../models/user_model");

// Book service class
class StoreService {
    async buyBook(userId, bookId) {
        // Adding new book to users owned books list
        const res = await userModel.updateOne(
            { _id: userId },
            { $addToSet: { ownedBooks: bookId } }
        );

        if (res.n === 0) throw new Error('Неправельный идентификатор пользователя.')
    }
}

module.exports = StoreService;