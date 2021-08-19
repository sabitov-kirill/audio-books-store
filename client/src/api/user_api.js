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
    async registration({ name, email, password }) {
        const response = await fetch('/api/user/create', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        return { name };
    },

    async login({ email, password }) {
        const response = await fetch('/api/user/access', {
            method: "POST",
            headers: {"Contet-Type": "application/json;charset=utf-8"},
            body: JSON.stringify({ email, password })
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

    },
}

export default UserApi;