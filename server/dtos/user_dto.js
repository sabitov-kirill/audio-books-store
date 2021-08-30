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
<<<<<<< HEAD
=======
        this.login       = model.login;
>>>>>>> 1ca7ab470af2c5f64e4c4fd9b9473b609c9a0341
        this.name        = model.name;
        this.ownedBooks  = model.ownedBooks;
        this.isAdmin     = model.isAdmin;
    }
}

module.exports = UserDTO;