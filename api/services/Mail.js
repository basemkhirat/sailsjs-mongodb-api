module.exports =  {

    sendWelcomeMail: function (user) {
        sails.hooks.email.send(
            "welcomeEmail",
            {
                user: user
            },
            {
                to: user.email,
                subject: sails.__("welcome_mail_subject")
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )
    }

};
