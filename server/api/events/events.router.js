var express = require('express');
var EventsCtrl = require('./events.controller.js');

var router = express.Router();

router.get('/', EventsCtrl.getEvents);
router.post('/', EventsCtrl.createEvent);
router.get('/:eventId', EventsCtrl.getEvent);
router.patch('/:eventId', EventsCtrl.modifyEvent);
router.patch('/:eventId/checkin', EventsCtrl.checkIn);
router.patch('/:eventId/users/:userId', EventsCtrl.modifyUserInEvent);
router.put('/:eventId/users/:userId', EventsCtrl.addUserToEvent);
router.delete('/:eventId/users/:userId', EventsCtrl.removeUserFromEvent);

module.exports = router;
