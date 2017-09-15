/**
 * User.js
 *
 * @description :: making users.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {

    schema: true,

    /**
     * all user attributes
     */
    attributes: {

        first_name: {
            type: 'string',
            required: true,
            index: true
        },

        last_name: {
            type: 'string',
            required: true,
            index: true
        },

        email: {
            type: 'string',
            email: true,
            unique: true,
            required: true,
            index: true
        },

        username: {
            type: 'string',
            alphanumeric: true,
            minLength: 2,
            maxLength: 100,
            unique: true,
            index: true
            /*defaultsTo: function () {
                return this.email;
            }*/
        },

        password: {
            type: 'string',
            required: true,
            minLength: 10,
            maxLength: 50
        },

        lang: {
            type: "string",
            minLength: 2,
            maxLength: 2,
            index: true,
            defaultsTo: sails.config.i18n.defaultLocale
        },

        age: {
            type: "integer",
            min: 4,
            index: true
        },

        score: {
            type: "integer",
            index: true,
            defaultsTo: 0,
        },

        /**
         * for security. remove password from response
         * @returns {*}
         */
        toJSON: function () {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },

    /**
     * before user create hook
     * @param user
     * @param callback
     */
    beforeCreate: function (user, callback) {

        if (user.password === undefined) {
            callback();
        }

        bcrypt.genSalt(10, function (error, salt) {
            if (error) return callback(error);
            bcrypt.hash(user.password, salt, function (error, hash) {
                if (error) return callback(error);
                user.password = hash;
                callback();
            });
        });

    },

    /**
     * compare raw and encrypted password
     * @param password
     * @param encryptedPassword
     * @param callback
     */
    comparePassword: function (password, encryptedPassword, callback) {

        bcrypt.compare(password, encryptedPassword, function (error, match) {
            if (error) callback(error);
            if (match) {
                callback(null, true);
            } else {
                callback(error);
            }
        });

    }

};

