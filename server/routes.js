/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var AuthCtrl = require('./api/auth/auth.controller');
module.exports = function(app) {

    // Insert routes below
    app.use('/api/auth', require('./api/auth/auth.router.js'));
    app.use('/api/users', require('./api/users/users.router.js'));
    app.use('/api/groups',  AuthCtrl.ensureAuthenticated, require('./api/groups/groups.router.js'));
    app.use('/api/events', AuthCtrl.ensureAuthenticated, require('./api/events/events.router.js'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
     .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
      .get(function(req, res) {
        res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
      });
};
