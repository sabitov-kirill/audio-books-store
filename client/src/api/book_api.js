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

    async fetchBooksCards() {
        const response = await fetch('api/books/cards', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        });
        
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async fetchBookData(bookData) {
        const response = await fetch('api/books/data', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(bookData),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async create() {
        const response = await fetch('api/books/create', {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
    }
}

export default bookApi;
