/**
 * Following.js
 *
 * @description :: making followings.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,
    autoPK: false,
    autoUpdatedAt: false,

    /**
     * all following attributes
     */
    attributes: {

        user_id: {
            type: "integer",
            required: true,
            index: true
        },

        user: {
            type: "json",
            required: true,
            index: true
        }

    }
};

