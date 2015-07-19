/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var schedule = require('./schedule');
var braintree = require('braintree');

// setup brain tree
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "pdqfv2v9hfpvbpbr",
    publicKey: "mcq2qbg8tsk4t9nx",
    privateKey: "5ed9a560094ed7d3d5f6aa86c3c7d7cb"
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
