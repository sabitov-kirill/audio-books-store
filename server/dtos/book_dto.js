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
        this.title =        model.title;
        this.author =       model.author;
        this.description =  model.description;
        this.price =        model.price;
        this.imagePath =    model.imagePath;
        this.textPath =     model.textPath;
        this.speechPath =    model.speechPath;
        this.spechMapPath = model.spechMapPath;
    }

    card() {
        return {
            title: this.title,
            author: this.author,
            description: this.description,
            price: this.price,
            imagePath: this.imagePath
        }
    }

    data() {
        return {
            textPath: this.textPath,
            speechPath: this.speechPath,
            spechMapPath: this.spechMapPath
        }    
    }
}

module.exports = BookDTO;