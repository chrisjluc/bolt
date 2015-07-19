var express = require('express');
var PaymentsCtrl = require('./payments.controller.js');

var router = express.Router();

router.get('/events/:eventId', PaymentsCtrl.getEventUnpaidFees);

module.exports = router;
