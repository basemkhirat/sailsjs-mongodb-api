/**
 * Comment.js
 *
 * @description :: making comments.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    /**
     * all comment attributes
     */
    attributes: {

        post_id: {
            type: "string",
            required: true,
            index: true
        },

        parent: {
            type: "integer",
            index: true,
            defaultsTo: 0
        },

        user: {
            type: "json",
            required: true,
            index: true
        },

        title: {
            type: "string",
            required: true,
            index: true
        }

    }

};

