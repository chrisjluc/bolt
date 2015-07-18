/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var paypal = require('paypal-rest-sdk');

// Set up paypal
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AUXGapTnFrkF7NSH6-sopE_DXA7ktDd3sgRUmHR9IWxoCRajy7fLzCPqAKeGA1wdAWa0LuXEQadEj1Eq',
    'client_secret': 'EGLv26LPeyvJRYTru4Qm8EuxPB6qK3XrzZ3fbvNa85EqTStQ6GlZIwMlQYYP60utcOoNOgnDKCYGlO4F',
    'openid_redirect_uri': 'http://localhost:9000/api/auth'
});

var loginUrl = paypal.openIdConnect.authorizeUrl(
        {'scope': 'openid'}
);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
