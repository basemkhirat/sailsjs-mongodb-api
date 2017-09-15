/**
 * Image.js
 *
 * @description :: making images.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

let jimp = require("jimp");

module.exports = {

    schema: true,

    /**
     * all images attributes
     */
    attributes: {
        path: {
            type: "string",
            required: true,
            unique: true
        },
        title: {
            type: "string"
        },
    },

    saveData: function (data, callback) {

        // replace base64 mime header if exists
        data = data.replace(/^data:image\/\w+;base64,/, "");

        // generate random file name
        const file = Math.random().toString(36).replace("0.", "");

        // create a new buffer with image data
        const base64Image = new Buffer(data, 'base64');

        jimp.read(base64Image, function (error, jImage) {
            if (error) return callback(error, false);

            // get image extension from data mime type
            const extension = ImageService.getExtension(jImage._originalMime);

            // save original image
            jImage.write(ImageService.uploadPath + "/" + file + "." + extension, function (error) {
                if (error) return callback(error, false);

                // save image thumbnails
                ImageService.generateThumbnails(file + "." + extension, function (error, done) {
                    if (error || !done) return callback(error, false);

                    // save to database
                    Image.create({path: file + "." + extension}, function (error, image) {
                        callback(error, image);
                    });

                });
            });

        });

    }


};

