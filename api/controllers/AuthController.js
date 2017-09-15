/**
 * AuthController
 *
 * @description :: Server-side logic for managing auth
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    /**
     * authenticate user via email/password
     * @param req
     * @param res
     * @returns {*}
     */
    index: function (req, res) {

        const email = req.param('email');
        const password = req.param('password');

        if (!email || !password) {
            return res.badRequest('Email and password required');
        }

        User.findOne({email: email}, function (error, user) {

            if (error) return res.serverError(error);
            if (!user) return res.badRequest('Invalid email or password');

            User.comparePassword(password, user.password, function (error, valid) {

                if (error) {
                    return res.forbidden('Forbidden');
                }

                if (!valid) {
                    return res.badRequest('Invalid email or password');
                } else {
                    return res.ok({
                        user: user,
                        token: Auth.generateToken({id: user.id}),
                        expires: new Date().getTime() + 3 * 60 * 60
                    });
                }

            });
        })
    }

};

