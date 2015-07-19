var _ = require('lodash');
var Event = require('../../models/event.model.js');
var schedule = require('../../schedule');

var eventsController = {
	getEvents: getEvents,
	createEvent: createEvent,
	modifyEvent: modifyEvent,
	addUserToEvent: addUserToEvent,
	removeUserFromEvent: removeUserFromEvent,
	addUserToLateList: addUserToLateList,
	removeUserFromLateList: removeUserFromLateList
};

module.exports = eventsController;

function getEvents(req, res, next) {
	var userId = req.headers.user._id;
	var query = {
		'users.account': userId
	};

	Event
		.find(query, function(error, events) {
			if (error) {
				error = new Error('Some error when finding events.');
				return next(error);
			}

			return res.status(200).send({
				events: events
			});
		});
}

function createEvent(req, res, next) {
	var userId = req.headers.user._id;
	var eventName = req.body.eventName;
	var participants = req.body.participants;
	var startDate = req.body.startDate;
	var location = req.body.location;
	var lateFee = req.body.lateFee;

	var newEvent = new Event({
		name: eventName,
		users: [{
			account: userId,
			role: 'host'
		}],
		start_date: startDate,
		location: location,
		late_fee: lateFee,
		status: 'scheduled'
	});

	_.forEach(participants, function (participant) {
		var newParticipant = {
			account: participant._id,
			role: 'participant'
		};
		newEvent.users.push(newParticipant);
	});

	newEvent.save(function (error, savedEvent) {
		if (error) {
			return next(error);
		}

		schedule.scheduleEvent(savedEvent);

		return res.status(200).send({
			event: savedEvent
		})
	})
}

function modifyEvent(req, res, next) {
	var VALID_FIELDS = ['start_date', 'location', 'late_fee', 'status'];
	var requestedModification = req.body.update;
	var eventId = req.params.eventId;
	var update = {};
	var options = {'new': true, runValidators: true};
	var eventFields = _.keys(requestedModification);

	_.forEach(eventFields, function (fieldName) {
		var isValidField = _.contains(VALID_FIELDS, fieldName);
		if (isValidField) {
			update[fieldName] = requestedModification[fieldName];
		}
	});

	if (!_.isEmpty(update)) {
		update.updated_at = Date.now();
		Event
			.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
				if (error) {
					error = new Error('Problem with updating event.');
					return next(error);
				}

				res.status(200).send({
					event: newEvent
				});
			});
	} else {
		Event
			.findById(eventId, function (error, event) {
				if (error) {
					error = new Error('Problem with finding event.');
					return next(error);
				}

				res.status(200).send({
					event: event
				});
			});
	}
}

function addUserToEvent(req, res, next) {
	var eventId = req.params.eventId;
	var userToAdd = req.params.userId;
	var update = {
		$addToSet: {
			users: {
				account: userToAdd,
				role: 'participant'
			}
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}

function removeUserFromEvent(req, res, next) {
	var eventId = req.params.eventId;
	var userToRemove = req.params.userId;
	var update = {
		$pull: {
			users: {
				account: userToRemove,
				role: 'participant'
			}
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}

function addUserToLateList(req, res, next) {
	var eventId = req.params.eventId;
	var userToAdd = req.params.userId;
	var update = {
		$push: {
			late_users: userToAdd
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}

function removeUserFromLateList(req, res, next) {
	var eventId = req.params.eventId;
	var userToRemove = req.params.userId;
	var update = {
		$pull: {
			late_users: userToRemove
		}
	};
	var options = {'new': true, runValidators: true};

	Event
		.findByIdAndUpdate(eventId, update, options, function (error, newEvent) {
			if (error) {
				error = new Error('Problem with updating event.');
				return next(error);
			}

			res.status(200).send({
				event: newEvent
			});
		});
}
