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
class AuthService {
    constructor(accessTokenKey) {
        this.tokenSerice = new TokenSerice(accessTokenKey);
    }

    async registration(name, login, password) {
        // Creatign password hash to store
        const hashedPassword = await bcrypt.hash(password, 4);

        // Creating new authorization document, creating its transfer object
        const user = await userModel.create({
            name,
            login,
            password: hashedPassword
        })
            .catch((error) => {
                if (error.code === 11000) throw new Error(`Пользователь с логином "${login}" уже существует.`);
                else                      throw error;
            });
        const userDTO = new UserDTO(user);

        // Generating authorization access and refresh tokens
        const accessToken = this.tokenSerice.generate({ userId: user._id });

        // Return authorization info object
        return { user: userDTO, accessToken };
    }

    async login(login, password) {
        // Check if authorization with passed login exist
        const user = await userModel.findOne({ login });
        if (!user) throw new Error('Неправильный логин. Пользователь не найден.');

        // Comparing passwords, if success 
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) throw new Error(`Неправельный пароль.`);
        const userDTO = new UserDTO(user);

        // Generating authorization access and refresh tokens
        const accessToken = this.tokenSerice.generate({ userId: user._id });

        // Return authorization info object
        return { user: userDTO, accessToken };
    }

    async validate(accessToken) {
        // Check if authorization accessToken is valid and generated on this server
        const payload = this.tokenSerice.validate(accessToken);

        // Finding authorization by stored in token id
        const user = await userModel.findOne({ _id: payload.userId });
        if (!user) throw new Error('Пользователь с сохраненым идентификатором не найден.');
        return new UserDTO(user);
    }
}

module.exports = AuthService;
