/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                User service handle module.
 *                Service is performing all the work with information received from the controller.
 *
 */

const bcrypt = require('bcrypt');

const userModel = require('../models/user_model')

// User service class
class UserService {
    async create(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 4);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
            .catch((error) => {
                if (error.code === 11000) throw new Error(`User with email "${email}" already exist.`);
                else                      throw error;
            });

        // Return user info object
        return user;
    }

    async get(email, password) {
        // Check if user with passed email exist
        const user = await userModel.findOne({ email })
        if (!user) throw new Error('Wrong email. User not found.');

        // Check password
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw new Error(`Wrong password.`)
        }

        // Return user info object
        return user;
    }
}

module.exports = new UserService();
