/**
 *
 * CREATION DATE: 16.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User api for requests to server module.
 *
 */

const UserApi = {
    async registration({ name, login, password }) {
        const response = await fetch('/api/user/create', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({ name, login, password })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return { name };
    },

    async login({ login, password }) {
        const response = await fetch('/api/user/access', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({ login, password })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async reLogin() {
        const response = await fetch('/api/user/reaccess', {
            method: "GET"
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return result;
    },

    async logout() {
        const response = await fetch('/api/user/leave', {
            method: "GET"
        });
        if (!response.ok) throw new Error("Ошибка при выходе из системы.");
        else caches.delete('user').then(function(ok){});
    },

    async buyBook({ bookId }) {
        const response = await fetch('/api/user/buy-book/' + bookId, {
            method: "POST"
        });
        if (!response.ok) throw new Error("Ошибка при покупке книги.");
        return { bookId };
    },
}

export default UserApi;