var _ = require('lodash');
var async = require('async');
var Payment = require('../../models/payment.model.js');
var schedule = require('../../schedule');
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config/environment');

var paymentsController = {
    getEventUnpaidFees: getEventUnpaidFees
};

module.exports = paymentsController;

function getEventUnpaidFees(req, res, next) {
    var eventId = req.query.eventId;
    var query = { event: eventId, status: 'unpaid' };

    Payment.find(query, function(error, payments) {
        if (error) {
            error = new Error('Some error when finding payments.');
            return next(error);
        }

        return res.status(200).send('yo');
    });
}