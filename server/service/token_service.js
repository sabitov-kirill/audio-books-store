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
    constructor(accessTokenSeckret) {
        this.accessTokenSeckret = accessTokenSeckret;
    }

    generate(payload) {
        return jwt.sign(payload, this.accessTokenSeckret, {expiresIn: '20d'});
    }

    validate(token) {
        const payload = jwt.verify(token, this.accessTokenSeckret);
        return payload;
    }

    update(token) {
        const payload = jwt.verify(token, this.accessTokenSeckret);
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti;

        return jwt.sign(payload, this.secretOrPrivateKey, {expiresIn: '20d'});
    }
}

module.exports = TokenService;