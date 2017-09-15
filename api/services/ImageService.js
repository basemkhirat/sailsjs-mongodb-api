let jimp = require("jimp");

module.exports = {

    uploadPath: "assets/uploads",

    /**
     * generate thumbnails
     * @pax`ram file
     * @param callback
     */
    generateThumbnails: function (file, callback) {

        async.mapSeries(
            sails.config.app.media.thumbnails,
            function (thumbnail, callback) {
                jimp.read(ImageService.uploadPath + "/" + file, function (error, jImage) {
                    if (error) return callback(error, false);

                    const mode = ImageService.getMode(thumbnail);
                    var resizedImage;

                    if (mode.type === "scaleToFit") {
                        resizedImage = jImage.scaleToFit(ImageService.getWidth(thumbnail), ImageService.getHeight(thumbnail));
                    }

                    resizedImage.write(ImageService.uploadPath + "/" + thumbnail.name + "-" + file, function () {
                        callback(null, true)
                    });
                });
            },
            function (error, thumbnails) {
                callback(error, thumbnails);
            }
        )

    },

    /**
     * detect extension from image mime type
     * @param mime
     * @returns {*}
     */
    getExtension(mime){

        if (mime === "image/png") {
            return "png";
        } else if (mime === "image/jpeg") {
            return "jpg";
        } else if (mime === "image/bmp") {
            return "bmp";
        }
        return null;

    },

    /**
     * get image resize mode
     * @param thumbnail
     * @returns {*}
     */
    getMode(thumbnail){

        const mode = thumbnail.mode !== undefined ? thumbnail.mode : {};

        return Object.assign({
            type: "scaleToFit"
        }, mode)

    },

    /**
     * get image width
     * @param thumbnail
     * @returns {*}
     */
    getWidth(thumbnail){
        return thumbnail.width !== undefined ? thumbnail.width : Jimp.AUTO;
    },

    /**
     * get image height
     * @param thumbnail
     * @returns {*}
     */
    getHeight(thumbnail){
        return thumbnail.height !== undefined ? thumbnail.height : Jimp.AUTO;
    }

};
