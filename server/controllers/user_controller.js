/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User controller handle module.
 *                Controller handles client requests and makes calls to service.
 *
 */

const AuthService = require('../service/auth_service')

// User controller class
class UserController {
    constructor(accessTokenKey, adminAccessTokenKey) {
        this.authService = new AuthService(accessTokenKey, adminAccessTokenKey);
    }

    async add(request, result) {
        try {
            // Getting login data from body
            const { name, login, password } = JSON.parse(request.body);
            const userData = await this.authService.registration(name, email, password);

            // Set user id and its refresh token sign to cookies
            result.cookie('acetsi', userData.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Return user data
            result.status(200).json(userData.user);
        } catch (e) {
            result.status(400).json({ error: e.message });
        }
    }

    async access(request, result) {
        try {
            // Getting registration data from body
            const { login, password } = JSON.parse(request.body);
            const userData = await this.authService.login(login, password);

            // Set user id and its refresh token sign to cookies
            result.cookie('acetsi', userData.accessToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Return user data
            result.status(200).json(userData.user);
        } catch (e) {
            result.status(401).json({ error: e.message });
        }
    }

    async reAccess(request, result) {
        result.status(200).json(request.user);
    }

    async leave(request, result) {
        try {
            // Delete access token from cookies, so user woun't re-login
            result.clearCookie('acetsi');

            // Return empty user object
            result.sendStatus(200);
        } catch (e) {
            result.status(400).json(e);
        }
    }

    async validate(request, result, next) {
        try {
            // Get access token from cookie and validate it
            const accessToken = request.cookies.acetsi;
            if (!accessToken) throw new Error('You must login before.');

            // Set user data
            request.user = await this.authService.validate(accessToken);

            next();
        } catch (e) {
            result.status(406).json({ error: e.message });
        }
    }

    async validateAdmin(request, result, next) {
        try {
            const { user } = request;
            if (!user.isAdmin) throw new Error('User dont have permissions for that operation.');

            next();
        } catch (e) {
            result.status(406).json({ error: e.message });
        }
    }

    async validateBookOwnership(request, result, next) {
        try {
            const { user } = request.user;
            const { bookId } = JSON.parse(request.body);

            if (!user.ownedBooks.includes(bookId)) {
                throw new Error('User does not own this book');
            }
        } catch (e) {
            result.status(406).json({ error: e.message });
        }
    }
}

module.exports = UserController;