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
    getClientToken: getClientToken
};

module.exports = paymentsController;

function getClientToken(req, res, next){
    gateway.clientToken.generate({}, function (err, response) {
        console.log(response.clientToken);
        res.send(response.clientToken);
    });
}
function getEventUnpaidFees(req, res, next) {
    var eventId = req.params.eventId;
    var query = { event: eventId, status: 'unpaid' };

    Payment.find(query, function(error, payments) {
        if (error) {
            error = new Error('Some error when finding payments.');
            return next(error);
        }

        return res.status(200).send(payments);
    });
}

function getPayments(req, res, next) {
    var userId = req.headers.user._id;
    var query = { user: userId };

    Payment
        .find(query, function(error, payments) {
            if (error) {
                error = new Error('Some error when finding payments.');
                return next(error);
            }

            return res.status(200).send(payments);
        })
}