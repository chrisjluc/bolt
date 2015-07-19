var express = require('express');
var EventsCtrl = require('./events.controller.js');

var router = express.Router();

router.get('/', EventsCtrl.getEvents);
router.post('/', EventsCtrl.createEvent);
router.patch('/:eventId', EventsCtrl.modifyEvent);
router.put('/:eventId/users/:userId', EventsCtrl.addUserToEvent);
router.delete('/:eventId/users/:userId', EventsCtrl.removeUserFromEvent);
router.put('/:eventId/late_users/:userId', EventsCtrl.addUserToLateList);
router.delete('/:eventId/late_users/:userId', EventsCtrl.removeUserFromLateList);

module.exports = router;
