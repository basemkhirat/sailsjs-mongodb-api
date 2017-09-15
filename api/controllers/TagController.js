/**
 * TagController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * find one tag
     * @param req
     * @param res
     */
    findOne: function (req, res) {

        const id = req.param("id");

        Tag.findOne({id: id}, function (error, tag) {
            if (error) return res.serverError(error);
            if (!tag) return res.notFound("Tag not found");

            return res.ok(tag);
        });

    },

    /**
     * find all tags
     * @param req
     * @param res
     */
    find: function (req, res) {

        Tag.find(function (error, tags) {
            if (error) return res.serverError(error);
            return res.ok(tags);
        });

    },

    /**
     * create a new tag
     * @param req
     * @param res
     */
    create: function (req, res) {

        const name = req.param("name");

        Tag.create({name: name}, function (error, tag) {
            if (error) return res.serverError(error);
            return res.ok(tag);
        })

    },

    /**
     * update a given tag
     * @param req
     * @param res
     */
    update: function (req, res) {

        const id = req.param("id");

        Tag.findOne({id: id}, function (error, tag) {
            if (error) return res.serverError(error);
            if (!tag) return res.notFound("Tag not found");

            const data = {};

            if (req.param("name")) {
                data.name = req.param("name");
            }

            Tag.update({id: id}, data, function (error, tag) {
                if (error) return res.serverError(error);
                return res.ok(tag);
            });

        });

    },

    /**
     * delete a given tag
     * @param req
     * @param res
     */
    destroy: function (req, res) {

        const id = req.param("id");

        Tag.findOne({id: id}, function (error, tag) {

            if (error) return res.serverError(error);
            if (!tag) return res.notFound("Tag not found");

            Tag.destroy({id: id}, function (error, tag) {
                if (error) return res.serverError(error);
                return res.ok(tag);
            });

        });

    }

};

