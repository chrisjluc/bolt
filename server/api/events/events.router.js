var express = require('express');
var EventsCtrl = require('./events.controller.js');

var router = express.Router();

router.get('/', EventsCtrl.getEvents);

module.exports = router;
