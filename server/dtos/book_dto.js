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
class BookDTO {
    constructor(model) {
        this.id =           model.id;
        this.title =        model.title;
        this.year =         model.year;
        this.description =  model.description;
        this.price =        model.price;
        this.status =       model.status;
        this.pagesCount =   model.pagesCount;
    }
}

module.exports = BookDTO;