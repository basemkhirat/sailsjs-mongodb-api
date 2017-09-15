/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * list one post
     * @param req
     * @param res
     */
    findOne: function (req, res) {

        const id = req.param("id");

        Post.findOne({id: id}, function (error, post) {
            if (error) return res.serverError(error);
            if (!post) return res.notFound("Post not found");
            return res.ok(post);
        });

    },

    /**
     * list all posts
     * @param req
     * @param res
     */
    find: function (req, res) {

        Post.find(function (error, posts) {
            if (error) return res.serverError(error);
            return res.ok(posts);
        });

    },

    /**
     * create a new post
     * @param req
     * @param res
     */
    create: function (req, res) {

        const post = {
            title: req.param("title"),
            tags: req.param("tags", []),
            image: req.param("image")
        };

        Post.create(post, function (error, post) {
            if (error) return res.serverError(error);
            return res.ok(post);
        });

    },

    /**
     * update post attributes
     * @param req
     * @param res
     */
    update: function (req, res) {

        const id = req.param("id");

        Post.findOne({id: id}, function (error, post) {
            if (error) return res.serverError(error);
            if (!post) return res.notFound("Post not found");

            const data = {};

            if (req.param("title")) {
                data.title = req.param("title");
            }

            // list of tags strings
            if (req.param("tags")) {
                data.tags = req.param("tags");
            }

            // base64 encoded image data
            if (req.param("image")) {
                data.image = req.param("image");
            }

            Post.update({id: id}, data, function (error, post) {
                if (error) return res.serverError(error);
                return res.ok(post);
            });

        });

    },

    /**
     * Like post
     * @param req
     * @param res
     */
    like: function (req, res) {

        const post_id = req.param("post_id");

        console.log("hiiiii");

        // check that user is liked this post before

        Like.findOne({id: post_id, "user.id": Auth.user("id")}, function (error, row) {

            if (error) return res.serverError(error);

            if (!row) {

                const data = {
                    post_id: post_id,
                    user: {
                        id: Auth.user("id"),
                        name: Auth.user("first_name")
                    }
                };

                Like.create(data, function (error, post) {
                    if (error) return res.serverError(error);
                    return res.ok(post);
                });
            }

        });

    },

    /**
     * delete a given post
     * @param req
     * @param res
     */
    destroy: function (req, res) {

        const id = req.param("id");

        Post.findOne({id: id}, function (error, post) {

            if (error) return res.serverError(error);
            if (!post) return res.notFound("Post not found");

            Post.destroy({id: id}, function (error, post) {
                if (error) return res.serverError(error);
                return res.ok(post);
            });

        });

    }

};

