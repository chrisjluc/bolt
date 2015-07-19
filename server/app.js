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
var schedule = require('./schedule');


// Set up paypal
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'ATIuH1VHksIaDFFpOfapLzPacHf9c7wDuT0wZzrngbzIbq593DEebUgidJ9BLv6Lma3VWRkEbWqY9lzZ',
    'client_secret': 'EFuhilq5zlCQkaoceLMOL77lcwb_pq--z-CgToYSTG5tPibqBbLSVd-CZeHtxJycehPyvYMTwk0UdhKp',
    'openid_redirect_uri': 'http://localhost:9000/redirect'
});

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

schedule.init();

// Expose app
exports = module.exports = app;
