/**
 * api policy
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {

    // User is allowed, proceed to the next policy,
    // or if this is the last policy, the controller
    if (Auth.check()) {
        return next();
    }

    // User is not allowed
    return res.forbidden('Not Authenticated');

};
