/**
 * Auth
 *
 * @description :: JSON Web token Service for sails
 * @help        :: See https://github.com/auth0/node-json web token & http://sailsjs.org/#!/documentation/concepts/Services
 */

const jwt = require('jsonwebtoken');

module.exports = {

    currentUser: null,

    /**
     * generate a new token
     * @param payload
     * @returns {*}
     */
    generateToken: function (payload) {
        return jwt.sign(
            payload,
            sails.config.app.auth.token_secret,
            {
                expiresIn: sails.config.app.auth.token_expiration
            }
        );
    },

    /**
     * check token is valid
     * @param token
     * @param callback
     * @returns {*}
     */
    verifyToken: function (token, callback) {
        return jwt.verify(
            token,
            sails.config.app.auth.token_secret,
            {},
            callback
        )
    },

    /**
     * get decoded date from token
     * @param token
     * @returns {*}
     */
    decodeToken: function (token) {
        return jwt.decode(token);
    },

    /**
     * set current user
     * @param user
     */
    setUser: function (user) {
        this.currentUser = user;
    },

    /**
     * get logged user
     * @param field
     * @returns {null}
     */
    user: function (field) {
        console.log(this.currentUser);
        return field != null ? this.currentUser[field] : this.currentUser;
    },

    /**
     * check if there is logged user
     * @returns {boolean}
     */
    check: function () {
        return !!this.currentUser;
    }

};

