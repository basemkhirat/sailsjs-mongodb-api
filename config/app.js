module.exports.app = {

    auth: {
        token_secret: "5876a8abf6b0d72e87185dc0521afce7b382730e",
        token_expiration: "60m"
    },

    media: {

        thumbnails: [
            {
                name: "medium",
                width: 256,
                height: 256
            },

            {
                name: "small",
                width: 128,
                height: 128,
                mode : {
                    type: "scaleToFit"
                }
            },

            {
                name: "max",
                width: 500,
                height: 400,
                mode : {
                    type: "scaleToFit"
                }
            }
        ]

    }

};
