/**
 * Post.js
 *
 * @description :: making posts.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    /**
     * All post attributes
     */
    attributes: {

        title: {
            type: "text",
            required: true,
            index: true,
            minLength: 5
        },

        user: {
            type: "json",
            index: true
        },

        tags: {
            type: "array",
            index: true
        },

        image: {
            type: "json"
        },

        views_count: {
            type: "integer",
            index: true,
            defaultsTo: 0,
        },

        likes_count: {
            type: "integer",
            index: true,
            defaultsTo: 0,
        },

        comments_count: {
            type: "integer",
            index: true,
            defaultsTo: 0
        },

        score: {
            type: "integer",
            index: true,
            defaultsTo: 0
        },

        /**
         * set uniform post response
         * @returns {*}
         */
        toJSON: function () {
            const post = this.toObject();

            if (!post.image) post.image = {};
            if (!post.user) post.user = {};
            if (!post.tags) post.tags = [];

            return post;
        }
    },


    /**
     * before post create hook
     * @param post
     * @param callback
     */
    beforeCreate: function (post, callback) {

        async.parallel([

            // save auth user object
            function (callback) {

                if (Auth.check()) {
                    post.user = {
                        id: Auth.user("id"),
                        name: Auth.user("first_name")
                    };
                } else {
                    delete post.user;
                }

                callback();
            },

            // save post tags
            function (callback) {

                if (!Array.isArray(post.tags) || post.tags.length === 0) {
                    delete post.tags;
                    return callback();
                }

                Tag.saveList(post.tags, function (error, tags) {
                    if (error) return callback(error, null);

                    post.tags = tags;
                    callback();
                });
            },

            // save post image
            function (callback) {

                if (!post.image) {
                    delete post.image;
                    return callback();
                }

                Image.saveData(post.image, function (error, image) {
                    if (error) return callback(error);

                    if (image) {
                        post.image = {
                            id: image.id,
                            path: image.path
                        };
                    } else {
                        delete data.image;
                    }

                    callback();

                });

            },

        ], function (error) {
            if (error) return callback(error);
            callback(error, post);
        });
    },

    /**
     * before post update hook
     * @param data
     * @param callback
     */
    beforeUpdate: function (data, callback) {

        async.parallel([

            // save post tags
            function (callback) {

                if (!Array.isArray(data.tags) || data.tags.length === 0) {
                    delete data.tags;
                    return callback();
                }

                Tag.saveList(data.tags, function (error, tags) {
                    if (error) return callback(error);

                    data.tags = tags;
                    callback();
                });
            },

            // save post image
            function (callback) {

                if (!data.image) {
                    delete data.image;
                    return callback();
                }

                Image.saveData(data.image, function (error, image) {
                    if (error) return callback(error);

                    if (image) {
                        data.image = {
                            id: image.id,
                            path: image.path
                        };
                    } else {
                        delete data.image;
                    }

                    callback();
                });

            },

        ], function (error) {
            if (error) return callback(error);
            callback(error, data);
        });

    }
};

