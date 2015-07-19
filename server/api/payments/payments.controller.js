var _ = require('lodash');
var async = require('async');
var Payment = require('../../models/payment.model.js');
var config = require('../../config/environment');
var braintree = require('braintree');

// setup brain tree
var gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: "pdqfv2v9hfpvbpbr",
	publicKey: "mcq2qbg8tsk4t9nx",
	privateKey: "5ed9a560094ed7d3d5f6aa86c3c7d7cb"
});

var paymentsController = {
	getPayments: getPayments,
	getEventUnpaidFees: getEventUnpaidFees,
	getClientToken: getClientToken,
	pay: pay
};

module.exports = paymentsController;

function pay(req, res, next) {
	var payments = req.body.payments;
	var nonce = req.body.nonce;
	var total = req.body.total;

	gateway.transaction.sale({
		amount: total,
		paymentMethodNonce: nonce,
		options: {
			submitForSettlement: true
		}
	}, function (err, result) {
		if (!result) {
			console.error(err);
			return res.status(400).send(err);
		}

		setPaymentsToPaid(payments);
		return res.status(200).send("Success");
	});
}

function getClientToken(req, res, next) {
	gateway.clientToken.generate({}, function (err, response) {
		console.log(response.clientToken);
		res.send(response.clientToken);
	});
}
function getEventUnpaidFees(req, res, next) {
	var eventId = req.params.eventId;
	var query = {event: eventId, status: 'unpaid'};

	Payment.find(query, function (error, payments) {
		if (error) {
			error = new Error('Some error when finding payments.');
			return next(error);
		}

		return res.status(200).send(payments);
	});
}

function getPayments(req, res, next) {
	var userId = req.headers.user._id;
	var query = {user: userId};

	Payment
		.find(query, function (error, payments) {
			if (error) {
				error = new Error('Some error when finding payments.');
				return next(error);
			}

			return res.status(200).send(payments);
		})
}

function setPaymentsToPaid(payments) {
	_.forEach(payments, function (payment) {
		var query = {
			_id: payment._id
		};
		var update = {
			status: 'paid'
		};
		Payment.findOneAndUpdate(query, update, function(err){
			if (err) console.error(err);
		});
	});
}
