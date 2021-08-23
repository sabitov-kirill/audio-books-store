/**
 *
 * CREATION DATE: 19.08.2021
 *
 * PROGRAMMER:    Kirill Sabitov.
 *
 * PURPOSE:       Audio books web store application.
 *                Tockens service handle module.
 *
 */
  
 const jwt = require('jsonwebtoken');
 
 class TokenService {
    constructor(secret) {
        this.secret = secret;
    }

    generate(payload) {
        const signString = jwt.sign(payload, this.secret, {expiresIn: '20d'});
        return signString;
    }
   
    validate(token) {
        const payload = jwt.verify(token, this.secret);
        return payload;
    }
}

module.exports = TokenService;