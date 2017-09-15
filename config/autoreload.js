module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
        "api/models",
        "api/controllers",
        "api/services",
        "api/emails",
        "api/policies",
        "api/services",
        "config/locales",
        "config"
    ],
    ignored: [
        // Ignore all files with .ts extension
        "**.ts"
    ]
};
