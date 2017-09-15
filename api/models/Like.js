/**
 * Like.js
 *
 * @description :: making likes.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,
    autoPK: false,
    autoUpdatedAt: false,

    /**
     * all likes attributes
     */
    attributes: {

        post_id: {
            type: "string",
            required: true,
            index: true
        },

        user: {
            type: "json",
            required: true,
            index: true
        },

    }

};

