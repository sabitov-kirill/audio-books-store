/**
 *
 * CREATION DATE: 17.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Authentication and authorization service handle module.
 *                Service is performing all the work with information received from the controller.
 *
 */

const bcrypt = require('bcrypt');

const userModel = require('../models/user_model');
const UserDTO = require('../dtos/user_dto');
const TokenSerice = require('./token_service');

// User service class
class UserService {
    constructor(accessSeckret) {
        this.tokenSerice = new TokenSerice(accessSeckret);
    }

    async registration(name, email, password) {
        // Creatign password hash to store
        const hashedPassword = await bcrypt.hash(password, 4);

        // Creating new user document, creating its transfer object
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword
        })
            .catch((error) => {
                if (error.code === 11000) throw new Error(`User with email "${email}" already exist.`);
                else                      throw error;
            });
        const userDTO = new UserDTO(user);

        // Generating user access and refresh tokens
        const accessToken = this.tokenSerice.generate({ userId: user._id });
            
        // Return user info object
        return { user: userDTO, accessToken };
    }

    async login(email, password) {
        // Check if user with passed email exist
        const user = await userModel.findOne({ email });
        if (!user) throw new Error('Wrong email. User not found.');

        // Comparing passwords, if success 
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw new Error(`Wrong password.`);
        const userDTO = new UserDTO(user);

        // Generating user access and refresh tokens 
        const accessToken = this.tokenSerice.generate({ userId: user._id });
            
        // Return user info object
        return { user: userDTO, accessToken };
    }

    async reLogin(accessToken) {
        // Check if user accessToken is valid and generated on this server
        // If success return its data
        const payload = this.tokenSerice.validate(accessToken);

        // Finding user by stored in token id.
        const user = await userModel.findOne({ _id: payload.userId });
        if (!user) throw new Error('User with stored id not found.');
        return new UserDTO(user);
    }
}

module.exports = UserService;
