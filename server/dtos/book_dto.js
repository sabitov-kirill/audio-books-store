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
        this.title =       model.title;
        this.author =      model.author;
        this.description = model.description;
        this.price =       model.price;
        this.image =       model.fspath + ".png";

        this.audio =       model.fspath + ".mp4";
        this.text =        model.fspath + ".txt";
        this.spechMap =    model.fspath + ".json";
    }

    card() {
        return {
            title: this.title,
            author: this.author,
            description: this.description,
            price: this.price,
            image: this.image
        }
    }

    data() {
        return {
            audio: this.audio,
            text: this.text,
            spechMap: this.spechMap,
            image: this.image
        }    
    }
}

module.exports = BookDTO;