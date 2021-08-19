/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Daniel Konev
 *
 * PURPOSE:       Audio books web store application.
 *                Book API realisation module.
 *
 */

const bookApi = {
    async testFunc(book) {
        return book; // lol idk why
    },

    async downloadAllBooks() {
        const response = await fetch('api/book/cards', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        });
        
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async downloadBook(bookData) {
        const response = await fetch('api/book/data', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(bookData),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async create() {
        const response = await fetch('api/book/create', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
    }
}

export default bookApi;
