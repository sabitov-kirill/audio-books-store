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
    constructor(tokenKey) {
        this.authService = new AuthService(tokenKey);
    }

    async create(request, result) {
        try {
            // Getting login data from body
            const { name, email, password } = JSON.parse(request.body);
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
            const { email, password } = JSON.parse(request.body);
            const userData = await this.authService.login(email, password);

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
            request.user = await this.authService.validate(accessToken);

            // Return user data
            next();
        } catch (e) {
            result.status(406).json({ error: e.message });
        }
    }
}

module.exports = UserController;