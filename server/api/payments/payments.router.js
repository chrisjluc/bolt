var express = require('express');
var PaymentsCtrl = require('./payments.controller.js');

var router = express.Router();

router.get('/', PaymentsCtrl.getPayments);
router.post('/pay', PaymentsCtrl.pay);
router.get('/events/:eventId', PaymentsCtrl.getEventUnpaidFees);
router.get('/client-token', PaymentsCtrl.getClientToken);

module.exports = router;
