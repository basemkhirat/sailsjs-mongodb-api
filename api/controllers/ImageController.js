/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * find one image
     * @param req
     * @param res
     */
    findOne: function (req, res) {

        const id = req.param("id");

        Image.findOne({id: id}, function (error, image) {
            if (error) return res.serverError(error);
            if (!image) return res.notFound("Image not found");

            return res.ok(image);
        });

    },

    /**
     * find all images
     * @param req
     * @param res
     */
    find: function (req, res) {

        Image.find(function (error, images) {
            if (error) return res.serverError(error);
            return res.ok(images);
        });

    },

    /**
     * create a new image
     * @param req
     * @param res
     */
    create: function (req, res) {

        const title = req.param("title");
        const data = req.param("data");

        Image.create({title: title, data: data}, function (error, image) {
            if (error) return res.serverError(error);
            return res.ok(image);
        });

    },

    /**
     * update a given image
     * @param req
     * @param res
     */
    update: function (req, res) {

        const id = req.param("id");

        Image.findOne({id: id}, function (error, image) {
            if (error) return res.serverError(error);
            if (!image) return res.notFound("Image not found");

            const title = req.param("title", image.title);

            Image.update({id: id}, {title: title}, function (error, image) {
                if (error) return res.serverError(error);
                return res.ok(image);
            });

        });

    },

    /**
     * delete a given image
     * @param req
     * @param res
     */
    destroy: function (req, res) {

        const id = req.param("id");

        Image.findOne({id: id}, function (error, image) {

            if (error) return res.serverError(error);
            if (!image) return res.notFound("Image not found");

            Image.destroy({id: id}, function (error, image) {
                if (error) return res.serverError(error);
                return res.ok(image);
            });

        });

    }
};

