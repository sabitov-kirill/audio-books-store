/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User data transfer object handle.
 *
 */

// User data transfer object
class UserDTO {
    constructor(model) {
        this.id          = model.id;
        this.email       = model.email;
        this.name        = model.name;
        this.bagBooks    = model.bagBooks;
        this.ownedBooks  = model.ownedBooks;
        this.isAdmin     = model.isAdmin;
    }
}

module.exports = UserDTO;