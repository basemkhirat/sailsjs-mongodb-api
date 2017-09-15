/**
 * Tag.js
 *
 * @description :: making tags.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    /**
     * all tags attributes
     */
    attributes: {
        name: {
            type: "string",
            required: true,
            minLength: 2,
            maxLength: 75,
            index: true,
            unique: true
        }
    },

    /**
     * save a list of tag names
     * @param names
     * @param callback
     */
    saveList: function (names, callback) {

        var tagList = [];

        if (Array.isArray(names)) {
            tagList = names;
        } else {
            tagList.push(names);
        }

        async.map(
            tagList,
            function (name, callback) {
                Tag.findOne({name: name}, function (error, tag) {
                    if (error) return callback(error);

                    if (tag) {
                        // Tag is already exists. Get it.
                        const tagItem = {};
                        tagItem.id = tag.id;
                        tagItem.name = tag.name;
                        callback(null, tagItem);
                    } else {
                        // Tag is not exist. Create it.
                        Tag.create({name: name}, function (error, tag) {
                            if (error) return callback(error);

                            const tagItem = {};
                            tagItem.id = tag.id;
                            tagItem.name = tag.name;
                            callback(null, tagItem);
                        })
                    }
                });
            },
            function (error, tags) {
                callback(error, tags);
            }
        );

    },

};

