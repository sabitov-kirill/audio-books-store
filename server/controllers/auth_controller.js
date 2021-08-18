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

const userService = require('../service/user_service')

// User controller class
class AuthController {
    async registration(request, result) {
        try {
            // Getting login data from body
            const { name, email, password } = JSON.parse(request.body);
            const user = await userService.create(name, email, password);

            // Set cookies
            result.cookie('email', user.email, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            result.cookie('password', user.password, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            result.cookie('id', user._id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Return user data
            result.status(200).send({
                user: {
                    email: user.email,
                    name: user.name,
                    bagBooks: [],
                    ownedBooks: []
                }
            });
        } catch (e) {
            result.status(400).send({ error: e.message });
        }
    }

    async login(request, result) {
        try {
            // Getting registration data from body
            const { email, password } = JSON.parse(request.body);
            const user = await userService.get(email, password);

            // Set cookies
            result.cookie('email', user.email, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            result.cookie('password', user.password, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            result.cookie('id', user._id, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

            // Return user data
            result.status(200).send({
                email: user.email,
                name: user.name,
                bagBooks: user.bagBooks,
                ownedBooks: user.ownedBooks,
            });
        } catch (e) {
            result.status(400).send({ error: e.message });
        }
    }

    async logout(request, result) {
        try {
            const { email } = request.cookies;
            await userService.logout(email);

            // Delete all cookies, so account would not be re-logged in by session
            result.cookie('email', '', { maxAge: 0, httpOnly: true });
            result.cookie('password', '', { maxAge: 0, httpOnly: true });
            result.cookie('status', '', { maxAge: 0, httpOnly: true });
            result.cookie('id', '', { maxAge: 0, httpOnly: true });

            // Return empty user object
            result.status(200).send({});
        } catch (e) {
            result.status(400).send(e);
        }
    }
}

module.exports = new AuthController();