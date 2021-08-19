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
        const response = await fetch('api/book/getAll', {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        });
        const result = await response.json();
        if (response.status === 400) throw new Error(result.error);
        return result;
    },

    async downloadBook(bookData) {
        const response = await fetch('api/book/getBook', {
            method: "POST",
            headers: {"Content-Type": "application/json;charset=utf-8"},
            body: JSON.stringify(bookData),
        });

        const result = await response.json();
        if (response.status === 400) throw new Error(result.error);
        return result;
    },

    async uploadBook() {
    }
}

export default bookApi;
