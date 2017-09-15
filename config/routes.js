/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'homepage'
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    // Auth
    'post /auth': 'AuthController.index',

    // Users
    'get /user': 'UserController.find',
    'get /user/:id': 'UserController.findOne',
    'post /user': 'UserController.create',
    'put /user/:id': 'UserController.update',
    'delete /user/:id': 'UserController.destroy',

    // Posts
    'get /post': 'PostController.find',
    'get /post/:id': 'PostController.findOne',
    'post /post': 'PostController.create',
    'post /post/:id/like': 'PostController.like',
    'put /post/:id': 'PostController.update',
    'delete /post/:id': 'PostController.destroy',



    // Tags
    'get /tag': 'TagController.find',
    'get /tag/:id': 'TagController.findOne',
    'post /tag': 'TagController.create',
    'put /tag/:id': 'TagController.update',
    'delete /tag/:id': 'TagController.destroy',

    // Image
    'get /image': 'ImageController.find',
    'get /image/:id': 'ImageController.findOne',
    'post /image': 'ImageController.create',
    'put /image/:id': 'ImageController.update',
    'delete /image/:id': 'ImageController.destroy',
};
