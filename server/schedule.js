var _ = require('lodash');
var schedule = require('node-schedule');
var Event = require('./models/event.model');
var paypal = require('paypal-rest-sdk');

module.exports = {
	init: init,
	scheduleEvent: scheduleEvent,
	authorizePayment: authorizePayment
};

var authorize_payment_json = {
	"intent": "sale",
	"redirect_urls": {
		"return_url": "http://localhost:9000"
	},
	"payer": {
		"payment_method": "paypal"
	},
	"transactions": [{
		"amount": {
			"currency": "CAD",
			"total": "1.00"
		},
		"description": "This is the payment description."
	}]
};

var capture_payment_json = {};

function init() {
	Event.find({status: 'scheduled', start_date: {$gte: Date.now()}}, function (err, events) {
		if (err) return console.log(err);
		_.forEach(events, function (event) {
			scheduleEvent(event);
		});
	});
}

function scheduleEvent(event) {
	console.log(event);
	schedule.scheduleJob(event._id, event.start_date, function () {
		Event.findById(event._id, function (err, event) {
			console.log(event._id + " " + event.name + " event is being triggered");
			// Charge users
		});
	});
}

function authorizePayment(user) {
	paypal.payment.create(
		authorize_payment_json,
		{
			refresh_token: user.refresh_token,
			access_token: user.access_token
		},
		function (error, payment) {
			if (error) {
				throw error;
			} else {
				console.log("Create Payment Response");
				console.log(payment);
			}
		});
}
